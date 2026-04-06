const https = require('https');
require('dotenv').config();

const GA_INSTANCE = process.env.GREEN_API_INSTANCE_ID;
const GA_TOKEN    = process.env.GREEN_API_TOKEN;

const testPhone = '919876543210'; 

function testSendMessage() {
  const chatId = testPhone + '@c.us';
  const payload = JSON.stringify({
    chatId,
    message: 'Test message text only'
  });

  const url = `https://api.green-api.com/waInstance${GA_INSTANCE}/sendMessage/${GA_TOKEN}`;

  const req = https.request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  }, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('--- sendMessage result ---');
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Response: ${data}`);
    });
  });

  req.on('error', (e) => console.error(e));
  req.write(payload);
  req.end();
}

testSendMessage();
