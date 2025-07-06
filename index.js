const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const allowedSenders = [
  "972587244521@c.us",
  "972123456789-111111@g.us"
];

const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

app.post("/greenapi-webhook", async (req, res) => {
  const sender = req.body?.senderData?.sender || req.body?.senderData?.chatId;

  if (allowedSenders.includes(sender)) {
    try {
      await axios.post(makeWebhookUrl, req.body);
      console.log(`✅ נשלח ל-Make: ${sender}`);
    } catch (err) {
      console.error("שגיאה בשליחה ל-Make:", err.message);
    }
  } else {
    console.log(`⛔️ שולח לא מורשה: ${sender}`);
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
