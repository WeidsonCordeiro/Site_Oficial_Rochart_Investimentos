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

  if (!to) {
    return res.status(400).json({
      success: false,
      error: "Email é obrigatórios.",
    });
  }

  const subject = "Confirmação de Subscrição na Newsletter";
  const message = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #4A90E2;
            padding-bottom: 20px;
        }
        h1 {
            color: #2C3E50;
            font-size: 28px;
            margin-bottom: 10px;
        }
        .greeting {
            font-size: 20px;
            color: #4A90E2;
            margin-bottom: 25px;
        }
        .content {
            margin-bottom: 30px;
        }
        p {
            margin-bottom: 18px;
            font-size: 16px;
            color: #444;
        }
        .highlight {
            background: #F0F7FF;
            padding: 20px;
            border-left: 4px solid #4A90E2;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        .resources-list {
            list-style: none;
            padding: 0;
        }
        .resources-list li {
            margin-bottom: 15px;
            padding-left: 25px;
            position: relative;
        }
        .resources-list li:before {
            content: "→";
            color: #4A90E2;
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #4A90E2, #357ABD);
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 5px;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
        }
        .signature {
            margin-top: 40px;
            padding-top: 25px;
            border-top: 1px solid #eee;
            color: #666;
            font-style: normal;
        }
        .social-links {
            margin-top: 20px;
            text-align: center;
        }
        .social-icon {
            display: inline-block;
            margin: 0 10px;
            color: #4A90E2;
            text-decoration: none;
            font-weight: 500;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 13px;
            color: #888;
            text-align: center;
        }
        .unsubscribe {
            font-size: 12px;
            color: #999;
            margin-top: 30px;
        }
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            .container {
                padding: 20px;
            }
            h1 {
                font-size: 24px;
            }
            .cta-button {
                display: block;
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Newsletter Weidson Cordeiro</h1>
            <p style="color: #666; font-size: 16px;">Conteúdo exclusivo sobre tecnologia & desenvolvimento</p>
        </div>

        <div class="content">
            <p class="greeting"><strong>Olá, tudo bem?</strong></p>
            
            <p>É um prazer tê-lo(a) na minha lista de contatos! Preparo este conteúdo com carinho para compartilhar <strong>insights valiosos, novidades técnicas e oportunidades</strong> que podem acelerar sua jornada na tecnologia.</p>
            
            <div class="highlight">
                <p><strong>📌 Destaque da semana:</strong> Compartilharei conteúdos focados em <strong>desenvolvimento fullstack, boas práticas e inovações do mercado</strong> que realmente fazem diferença no seu dia a dia como dev.</p>
            </div>

            <p><strong>🎯 O que você encontra aqui:</strong></p>
            <ul class="resources-list">
                <li><strong>Projetos práticos</strong> com código aberto no GitHub</li>
                <li><strong>Dicas técnicas</strong> sobre stacks modernas</li>
                <li><strong>Reflexões sobre carreira</strong> em tecnologia</li>
                <li><strong>Novidades</strong> do ecossistema de desenvolvimento</li>
            </ul>

            <p style="text-align: center; margin: 30px 0;">
                <a href="https://github.com/WeidsonCordeiro" class="cta-button">👨‍💻 Ver Projetos no GitHub</a>
                <a href="https://www.linkedin.com/in/weidson-cordeiro-45390244/" class="cta-button">💼 Conectar no LinkedIn</a>
            </p>

            <p><strong>💬 Fique à vontade para:</strong></p>
            <ul class="resources-list">
                <li>Explorar meus repositórios e contribuir</li>
                <li>Conectar-se para trocar ideias</li>
                <li>Sugerir temas para próximas edições</li>
                <li>Compartilhar feedback sobre os conteúdos</li>
            </ul>
        </div>

        <div class="signature">
            <p style="margin-bottom: 10px;"><strong>Weidson Cordeiro</strong></p>
            <p style="color: #4A90E2; margin: 5px 0;">Desenvolvedor FullStack</p>
            <p style="font-size: 14px; color: #666; margin: 5px 0;">Tecnologia • Inovação • Soluções Digitais</p>
            
            <div class="social-links">
                <a href="mailto:weidson.ac@gmail.com" class="social-icon">📧 E-mail</a>
                <a href="https://github.com/WeidsonCordeiro" class="social-icon">🐙 GitHub</a>
                <a href="https://www.linkedin.com/in/weidson-cordeiro-45390244/" class="social-icon">👔 LinkedIn</a>
            </div>
        </div>

        <div class="footer">
            <p>Este email foi enviado porque você se inscreveu para receber atualizações.</p>
            <div class="unsubscribe">
                <p>Não quer mais receber estes emails? <a href="{{unsubscribe_url}}" style="color: #999;">Cancelar inscrição</a></p>
                <p style="margin-top: 5px; font-size: 11px;">© ${new Date().getFullYear()} Weidson Cordeiro. Todos os direitos reservados.</p>
            </div>
        </div>
    </div>
</body>
</html>
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

app.post("/api/sendEmailContacto", async (req, res) => {
  const { name, email, phone, message } = req.body;

  console.log("Formulário de contato recebido:", {
    name,
    email,
    phone,
    message,
  });

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      error: "Nome, email, telefone e mensagem são obrigatórios.",
    });
  }

  try {
    // Email para VOCÊ (recebendo o contato)
    const requestToYou = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: email,
              Name: "Rocharte Investimentos Imobiliarios - Formulário de Contato",
            },
            To: [
              {
                Email: process.env.MAILJET_FROM_EMAIL, // Você recebe o email
                Name: "Weidson Cordeiro",
              },
            ],
            Subject: `Novo contato de ${name}`,
            HTMLPart: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
              <h2 style="color: #2c3e50;">📬 Novo Contato Recebido</h2>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleString("pt-BR")}</p>
              </div>
              
              <div style="background: #fff; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                <h3 style="color: #34495e; margin-top: 0;">Mensagem:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p><small>Para responder, utilize: <a href="mailto:${email}">${email}</a></small></p>
              </div>
            </div>
          `,
            TextPart: `
            NOVO CONTATO
            Nome: ${name}
            Email: ${email}
            Data: ${new Date().toLocaleString("pt-BR")}
            
            MENSAGEM:
            ${message}
            
            Para responder: ${email}
          `,
          },
        ],
      });

    // Email de confirmação para O VISITANTE (opcional, mas bom)
    const requestToVisitor = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_FROM_EMAIL,
              Name: "Weidson Cordeiro",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Recebi sua mensagem!",
            HTMLPart: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
              <h2 style="color: #2c3e50;">✅ Mensagem Recebida</h2>
              
              <p>Olá <strong>${name}</strong>,</p>
              
              <p>Recebi sua mensagem através do formulário de contato do site Rocharte Investimentos Imobiliarios.</p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><em>"${message.substring(0, 100)}${message.length > 100 ? "..." : ""}"</em></p>
              </div>
              
              <p>Vou analisar sua mensagem e responderei o mais breve possível.</p>
              
              <p>Atenciosamente,<br>
              <strong>Weidson Cordeiro</strong><br>
              <small>Desenvolvedor FullStack</small></p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="font-size: 12px; color: #7f8c8d;">
                Esta é uma confirmação automática. Por favor, não responda este email.<br>
                Para entrar em contato: <a href="mailto:${process.env.MAILJET_FROM_EMAIL}">${process.env.MAILJET_FROM_EMAIL}</a>
              </p>
            </div>
          `,
            TextPart: `
            Olá ${name},
            
            Recebi sua mensagem através do formulário de contato.
            
            Sua mensagem: "${message.substring(0, 100)}"
            
            Vou analisar e responderei o mais breve possível.
            
            Atenciosamente,
            Weidson Cordeiro
            
            ---
            Confirmação automática. Não responda este email.
          `,
          },
        ],
      });

    console.log("Emails de contato enviados com sucesso!");

    res.status(200).json({
      success: true,
      message: "Emails de contato enviados com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao enviar contato:", error);

    res.status(500).json({
      success: false,
      error: "Falha ao enviar mensagem",
      details: error.message,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// Exportar o servidor para o Vercel
module.exports = app;
