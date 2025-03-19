const express = require('express');
const cors = require('cors');
const Mailjet = require('node-mailjet');

require('dotenv').config();

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-newsletter', async (req, res) => {
    const { to, subject, message } = req.body;
    try {
        const request = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [{
                    From: { Email: process.env.MAILJET_FROM_EMAIL, Name: "Weidson Cordeiro" },
                    To: [{ Email: to }],
                    Subject: subject,
                    HTMLPart: `<p>${message}</p>`
                }]
            });

        res.json({ success: true, data: request.body });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/env', (req, res) => {
    try {
        res.json({
            EMAILJS_API_PUBLIC_KEY: process.env.EMAILJS_API_PUBLIC_KEY,
            EMAILJS_API_SERVICE_KEY: process.env.EMAILJS_API_SERVICE_KEY,
            EMAILJS_API_TEMPLATE_KEY: process.env.EMAILJS_API_TEMPLATE_KEY,
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));

// Exportar o servidor para o Vercel
module.exports = app;