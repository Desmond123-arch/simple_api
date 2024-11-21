const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require('dotenv').config()

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = process.env.BOT_TOKEN
const CHAT_ID = process.env.CHAT_ID;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

app.post("/send-message", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).send({ error: "Message is required" });
    }

    try {
        const response = await axios.post(TELEGRAM_API, {
            chat_id: CHAT_ID,
            text: message,
        });

        res.status(200).send({ success: true, data: response.data });
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
        res.status(500).send({ error: "Failed to send message" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
