# 🎬 CineQuotes — Legendary Movie Lines on WhatsApp

> Subscribe with your WhatsApp number, pick your personality (Gangster, Pookie, Sigma, Gen-Z...) and get iconic movie dialogues delivered to you every day.

---

## ✨ Features

- 🎭 **7 personality types** — Gangster, Pookie, Playboy, Sigma, Gen-Z, Hustler, Philosopher
- 📱 **WhatsApp delivery** via Twilio (sandbox & production)
- ⏰ **Daily scheduled quotes** via `node-cron`
- 💾 **SQLite persistence** — no external database needed
- 🛑 **STOP to unsubscribe** — users reply STOP to opt out instantly
- 🌐 **Beautiful landing page** — dark glassmorphism, animated orbs, multi-step form

---

## 🚀 Quick Start

### 1. Get Twilio credentials

1. Sign up free at [twilio.com](https://www.twilio.com/)
2. Go to **Console → Messaging → Try it out → Send a WhatsApp message**
3. Follow the sandbox setup — have your testers send the join code to `+1 415 523 8886`
4. Copy your **Account SID** and **Auth Token** from the Console dashboard

### 2. Configure environment

Edit `.env` and fill in your credentials:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
PORT=3000
QUOTE_CRON_SCHEDULE=0 9 * * *
```

### 3. Run the server

```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

Open **http://localhost:3000** in your browser. 🎉

---

## 📱 How WhatsApp Sandbox Works (Free Tier)

Twilio's WhatsApp sandbox requires users to **opt-in first**:

1. Your subscriber must send `join <your-sandbox-keyword>` to `+1 415 523 8886` on WhatsApp
2. Once opted in, they'll receive all messages from the server
3. Sandbox number: `+14155238886` (already configured in `.env`)

> **For production**: You need a Twilio WhatsApp-approved sender number. See [Twilio docs](https://www.twilio.com/docs/whatsapp/tutorial/connect-number-business-profile).

---

## 🗂️ Project Structure

```
moviequotes-whatsapp/
├── server.js          # Express server + Twilio + cron scheduler
├── quotes.js          # All movie quotes organized by personality
├── db.js              # SQLite subscriber database
├── .env               # Your secrets (never commit this!)
├── .env.example       # Template for others
├── public/
│   ├── index.html     # Landing page
│   ├── style.css      # Dark glassmorphism design
│   └── app.js         # Frontend logic
└── subscribers.db     # Auto-created SQLite file
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/stats` | Get active subscriber count |
| `GET`  | `/api/personalities` | List all personality types |
| `POST` | `/api/subscribe` | Subscribe a new user |
| `POST` | `/api/unsubscribe` | Unsubscribe a user |
| `POST` | `/api/send-now` | Manually trigger quotes to all subscribers |
| `POST` | `/webhook/whatsapp` | Twilio webhook for incoming messages (STOP handling) |

### Subscribe payload
```json
{
  "phone": "+917987654321",
  "nickname": "BigBoss",
  "personality": "gangster"
}
```

---

## ⏰ Cron Schedule Examples

```
0 9 * * *    → Every day at 9:00 AM
0 8,20 * * * → Twice daily at 8 AM and 8 PM
*/30 * * * * → Every 30 minutes (for testing)
```

---

## 🎭 Personality Types & Quote Style

| Type | Vibe | Example |
|------|------|---------|
| 🔫 Gangster | Streets, power, loyalty | *"Leave the gun. Take the cannoli."* |
| 🥺 Pookie | Romance, feelings, soft hours | *"If you're a bird, I'm a bird."* |
| 😎 Playboy | Charming, slick, suave | *"The name's Bond. James Bond."* |
| 🐺 Sigma | Lone wolf, silent grind | *"Don't get attached…"* |
| ✨ Gen-Z | Slay, no cap, main character | *"You're Kenough."* |
| 💰 Hustler | Grind, ambition, wins | *"Get busy living or get busy dying."* |
| 🧠 Philosopher | Deep, existential, big brain | *"What is real?"* |

---

## 🛡️ Unsubscribe

Users can unsubscribe at any time by replying **STOP** to any WhatsApp message. The Twilio webhook handles this automatically.

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web server |
| `twilio` | WhatsApp API |
| `node-cron` | Daily scheduling |
| `better-sqlite3` | Local subscriber storage |
| `dotenv` | Environment config |
| `cors` | Cross-origin headers |
| `body-parser` | Request parsing |
