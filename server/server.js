const express = require("express");
const cors = require("cors");
const Mailjet = require("node-mailjet");

require("dotenv").config();

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY,
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/sendNewsLetter", async (req, res) => {
  const { to } = req.body;

  const subject = "Confirmação de Subscrição na Newsletter";
  const message = `
              <h3 style="color: #333; font-family: Arial, sans-serif;">Olá!</h3>
              <p style="color: #555; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                  Esta é uma newsletter exclusiva enviada para você com o objetivo de compartilhar insights, novidades e oportunidades relevantes.
              </p>
              <p style="color: #555; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                  Estamos comprometidos em oferecer conteúdo de qualidade que agregue valor ao seu dia a dia. <strong>Fique à vontade para explorar os tópicos abaixo:</strong>
              </p>
              <ul style="color: #555; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                  <li><a href="https://github.com/WeidsonCordeiro" style="color: #007BFF; text-decoration: none;">Conheça meu perfil no GitHub</a> e veja projetos recentes.</li>
                  <li><a href="https://www.linkedin.com/in/weidson-cordeiro-45390244/" style="color: #007BFF; text-decoration: none;">Acesse meu LinkedIn</a> para saber mais sobre minha trajetória profissional.</li>
                  <li><a href="#" style="color: #007BFF; text-decoration: none;">Visite minha pagina pessoal</a> para acompanhar os artigos e dicas sobre tecnologia e inovação.</li>
              </ul>
              <p style="color: #555; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                  Caso tenha alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato comigo diretamente por <a href="mailto:weidson.ac@gmail.com" style="color: #007BFF; text-decoration: none;">e-mail</a>.
              </p>
              <p style="color: #555; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                  Agradeço por acompanhar nossas atualizações. Até breve!
              </p>
              <p style="color: #888; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
                  <em>Atenciosamente,<br>
                  Weidson Cordeiro<br>
                  Desenvolvedor FullStack | Tecnologia & Inovação</em>
              </p>
              `;

  try {
    const contactRequest = await mailjet
      .post("contactslist", { version: "v3" })
      .id(process.env.MAILJET_CONTACTS_NEWSLLETTERS_LIST_ID) // ID da lista criada
      .action("managecontact")
      .request({
        Email: to,
        Action: "addnoforce", // ou "addforce" para adicionar mesmo se existir
      });

    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: "Newsletter Weidson Cordeiro",
          },
          To: [{ Email: to }],
          Subject: subject,
          HTMLPart: `<p>${message}</p>`,
        },
      ],
    });

    // Em vez disso, verifique diretamente:
    if (request.response.status >= 400) {
      console.error("Mailjet error details:", request.response.data);
      throw new Error(
        `Mailjet error: ${JSON.stringify(request.response.data)}`,
      );
    }

    console.log("Email enviado com sucesso!");

    res.status(200).json({
      success: true,
      message: "Email enviado com sucesso!",
    });
  } catch (error) {
    console.error("Erro completo:", error);

    // Log mais detalhado do erro do Mailjet
    if (error.response) {
      console.error("Resposta do Mailjet:", error.response.body);
    }

    res.status(500).json({
      success: false,
      error: "Falha ao enviar email",
      details: error.message,
      statusCode: error.statusCode,
    });
  }
});

// app.post("/api/send-email", async (req, res) => {
//   const { nome, email, telefone, mensagem } = req.body;

//   const payload = {
//     service_id: process.env.EMAILJS_API_SERVICE_KEY,
//     template_id: process.env.EMAILJS_API_TEMPLATE_SITE_ROCHARTE_KEY,
//     user_id: process.env.EMAILJS_API_PUBLIC_KEY,
//     template_params: { nome, email, telefone, mensagem },
//   };

//   try {
//     const response = await fetch(
//       "https://api.emailjs.com/api/v1.0/email/send",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       },
//     );

//     const result = await response.json();
//     console.log("EmailJS response:", result);

//     if (response.ok) {
//       res.status(200).json({ message: "Email enviado!" });
//     } else {
//       res.status(500).json({ error: result });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// Exportar o servidor para o Vercel
module.exports = app;
