// server.js — CineQuotes backend
// Uses Green API (green-api.com) — free, no recipient opt-in needed.
// App owner links their WhatsApp once via QR → sends to ANY number.

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const cron       = require('node-cron');
const https      = require('https');
const path       = require('path');

const { Subscribers } = require('./db');
const { getRandomQuote, formatQuoteMessage, personalityLabels } = require('./quotes');

const app  = express();
const PORT = process.env.PORT || 3000;

// Green API credentials (from .env)
const GA_INSTANCE = process.env.GREEN_API_INSTANCE_ID || '';
const GA_TOKEN    = process.env.GREEN_API_TOKEN        || '';
const GA_READY    = GA_INSTANCE && GA_TOKEN &&
                    GA_INSTANCE !== 'your_instance_id' &&
                    GA_TOKEN    !== 'your_api_token';

if (!GA_READY) {
  console.warn('\n⚠️  Green API not configured. WhatsApp sending is disabled.');
  console.warn('   → Sign up free at https://green-api.com');
  console.warn('   → Create an instance, scan QR to link WhatsApp');
  console.warn('   → Copy INSTANCE_ID and TOKEN into .env\n');
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Green API: send WhatsApp message ────────────────────────────────────────
// chatId format: "919876543210@c.us"  (country code + number, no +, then @c.us)
function toChatId(phone) {
  return phone.replace(/^\+/, '') + '@c.us';
}

function sendWhatsApp(phone, message) {
  if (!GA_READY) return Promise.reject(new Error('GREEN_API_NOT_CONFIGURED'));

  return new Promise((resolve, reject) => {
    const chatId  = toChatId(phone);
    const payload = JSON.stringify({
      chatId,
      urlFile: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop',
      fileName: 'cinequotes-bg.jpg',
      caption: message
    });
    const url = `https://api.green-api.com/waInstance${GA_INSTANCE}/sendFileByUrl/${GA_TOKEN}`;

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode === 200) resolve(JSON.parse(data));
        else reject(new Error(`Green API ${res.statusCode}: ${data}`));
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get('/api/personalities', (_req, res) => {
  res.json(Object.entries(personalityLabels).map(([key, label]) => ({ key, label })));
});

app.get('/api/stats', (_req, res) => {
  res.json({ subscribers: Subscribers.count(), waReady: GA_READY });
});

// POST /api/subscribe — user provides phone + nickname + personality only
app.post('/api/subscribe', async (req, res) => {
  const { phone, nickname, personality } = req.body;

  if (!phone || !nickname || !personality) {
    return res.status(400).json({ success: false, message: 'Phone, nickname and personality are required.' });
  }

  // Normalise: keep digits only, prepend +
  const cleaned = '+' + phone.replace(/[^\d]/g, '');
  if (!/^\+\d{7,15}$/.test(cleaned)) {
    return res.status(400).json({ success: false, message: 'Enter a valid number with country code, e.g. +917xxxxxxxxx' });
  }

  if (!personalityLabels[personality]) {
    return res.status(400).json({ success: false, message: 'Invalid personality.' });
  }

  try {
    Subscribers.add(cleaned, nickname.trim(), personality);

    let whatsappSent = false;
    let sendError    = null;

    try {
      const quote      = getRandomQuote(personality);
      const welcomeMsg =
        `🎉 *Yo ${nickname.trim()}!* Welcome to *CineQuotes* — ${personalityLabels[personality]}!\n\n` +
        `Here's your first legendary line:\n\n` +
        `_"${quote.quote}"_\n\n— *${quote.movie}* (${quote.year})\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\nExpect a fresh quote every morning. Reply *MORE* for another quote, or *STOP* to unsubscribe 🎬`;

      await sendWhatsApp(cleaned, welcomeMsg);
      Subscribers.updateLastSent(cleaned);
      whatsappSent = true;
    } catch (err) {
      sendError = err.message;
      console.warn(`[WhatsApp] failed for ${cleaned}:`, err.message);
    }

    return res.json({
      success: true,
      message: whatsappSent
        ? `🎉 Subscribed! Check your WhatsApp — your first quote just landed!`
        : `✅ Subscribed! ${GA_READY ? '(WhatsApp send failed — check Green API instance)' : 'Set up Green API to start receiving quotes.'}`,
      count: Subscribers.count(),
      waReady: GA_READY,
      sendError: sendError || undefined,
    });

  } catch (err) {
    console.error('Subscribe error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// POST /api/unsubscribe
app.post('/api/unsubscribe', (req, res) => {
  const cleaned = '+' + (req.body.phone || '').replace(/[^\d]/g, '');
  Subscribers.remove(cleaned);
  res.json({ success: true, message: `Unsubscribed ${cleaned}.` });
});

// GreenAPI Webhook to listen for STOP messages
app.post('/webhook/greenapi', async (req, res) => {
  try {
    const body = req.body;
    if (body.typeWebhook === 'incomingMessageReceived') {
      let text = '';
      if (body.messageData?.typeMessage === 'textMessage') {
        text = body.messageData.textMessageData?.textMessage || '';
      } else if (body.messageData?.typeMessage === 'extendedTextMessage') {
        text = body.messageData.extendedTextMessageData?.text || '';
      }
      
      text = text.trim().toUpperCase();
      const sender = body.senderData?.sender;
      
      if (sender) {
        const phone = '+' + sender.replace('@c.us', '');
        
        if (text === 'STOP' || text === 'UNSUBSCRIBE' || text === 'CANCEL') {
          Subscribers.remove(phone);
          
          // Send a plain text confirmation (no image needed here)
          const payload = JSON.stringify({ chatId: sender, message: "🛑 You have been successfully unsubscribed from CineQuotes. You will no longer receive messages. Have a great day!" });
          const url = `https://api.green-api.com/waInstance${GA_INSTANCE}/sendMessage/${GA_TOKEN}`;
          
          const reqPost = https.request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
          });
          reqPost.on('error', console.error);
          reqPost.write(payload);
          reqPost.end();
        } else if (text === 'MORE') {
          const sub = Subscribers.getByPhone(phone);
          if (sub && sub.active) {
            const quote = getRandomQuote(sub.personality);
            const msg = formatQuoteMessage(sub.nickname, sub.personality, quote);
            await sendWhatsApp(phone, msg);
            Subscribers.updateLastSent(phone);
          }
        }
      }
    }
  } catch (err) {
    console.error('Webhook error:', err);
  }
  res.sendStatus(200);
});

// POST /api/send-now  (manual admin trigger — open in browser or curl)
app.post('/api/send-now', async (req, res) => {
  const subs = Subscribers.getActive();
  if (!subs.length) return res.json({ success: true, message: 'No active subscribers.' });

  const results = [];
  for (const sub of subs) {
    try {
      const quote = getRandomQuote(sub.personality);
      const msg   = formatQuoteMessage(sub.nickname, sub.personality, quote);
      await sendWhatsApp(sub.phone, msg);
      Subscribers.updateLastSent(sub.phone);
      results.push({ phone: sub.phone, status: 'sent' });
    } catch (e) {
      results.push({ phone: sub.phone, status: 'failed', error: e.message });
    }
  }

  res.json({
    success: true,
    sent: results.filter(r => r.status === 'sent').length,
    failed: results.filter(r => r.status === 'failed').length,
    results,
  });
});

// ─── Daily cron ───────────────────────────────────────────────────────────────
const schedule = process.env.QUOTE_CRON_SCHEDULE || '*/30 * * * *';

cron.schedule(schedule, async () => {
  const now  = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const subs = Subscribers.getActive();
  console.log(`\n[CRON ${now}] Sending to ${subs.length} subscriber(s)...`);

  for (const sub of subs) {
    try {
      const quote = getRandomQuote(sub.personality);
      const msg   = formatQuoteMessage(sub.nickname, sub.personality, quote);
      await sendWhatsApp(sub.phone, msg);
      Subscribers.updateLastSent(sub.phone);
      console.log(`  ✓ ${sub.phone} (${sub.personality})`);
    } catch (e) {
      console.error(`  ✗ ${sub.phone}:`, e.message);
    }
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎬 CineQuotes → http://localhost:${PORT}`);
  console.log(`📅 Schedule   → ${schedule}`);
  console.log(`📱 Subscribers→ ${Subscribers.count()}`);
  console.log(`💬 Green API  → ${GA_READY ? '✅ READY' : '⚠️  not configured (see .env)'}\n`);
});
