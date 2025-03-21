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

app.post('/api/send-newsletter', async (req, res) => {
    const { to, subject, message } = req.body;
    try {
        const request = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [{
                    From: { Email: process.env.MAILJET_FROM_EMAIL, Name: "Newsletter Weidson Cordeiro" },
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

app.post('/api/send-email', async (req, res) => {
    
    const { nome, email, telefone, mensagem } = req.body;
    const url = 'https://api.emailjs.com/api/v1.0/email/send';

        let templateParams = {
            nome,
            email,
            telefone,
            mensagem
        };

    try {

        const response = await fetch(url, {
            service_id: process.env.EMAILJS_API_SERVICE_KEY,
            template_id: process.env.EMAILJS_API_TEMPLATE_SITE_ROCHARTE_KEY,
            user_id: process.env.EMAILJS_API_PUBLIC_KEY,
            template_params: templateParams
          });

        res.status(200).json({ message: 'Email enviado com sucesso!' });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// Exportar o servidor para o Vercel
module.exports = app;