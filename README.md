
<p align="center">
  <img src="https://github.com/user-attachments/assets/45587d17-d32d-4911-8759-1ac8d8eee114" alt="image"/>
</p>


# Site Oficial Rochart Investimentos

Este projeto é um site front-end com funcionalidades de envio de contato e subscrição de newsletter utilizando a API do [EmailJS](https://www.emailjs.com/) e o Mailjet.

---

## 🚀 Funcionalidades

- **Envio de Contato**: Permite que os usuários enviem mensagens diretamente para o administrador do site.
- **Subscrição de Newsletter**: Permite que os usuários se inscrevam para receber newsletters.

---

## 🛠️ Configuração do Projeto

### 1. Pré-requisitos

- Node.js instalado ([Download Node.js](https://nodejs.org/))
- Conta no [EmailJS](https://www.emailjs.com/)
- Conta no [Mailjet](https://app.mailjet.com/signin/)
- Editor de código (recomendado: [Visual Studio Code](https://code.visualstudio.com/))

---

### 2. Configurando o EmailJS

1. **Crie uma conta no EmailJS**:
   - Acesse [EmailJS](https://www.emailjs.com/) e crie uma conta gratuita.

2. **Configure um serviço de email**:
   - No painel do EmailJS, vá para a aba **Email Services**.
   - Adicione um serviço de email (ex.: Gmail, Outlook, etc.).

3. **Crie um template de email**:
   - Vá para a aba **Email Templates** e crie um novo template.
   - Configure o template com os campos necessários (ex.: nome, email, mensagem).

4. **Obtenha suas credenciais**:
   - No painel do EmailJS, copie as seguintes credenciais:
     - **Public Key**
     - **Service ID**
     - **Template ID**

### 3. Configurando o Mailjet

1. **Crie uma conta no EmailJS**:
   - Acesse [Mailjet](https://app.mailjet.com/signin/) e crie uma conta gratuita.

2. **Obtenha suas credenciais**:
   - No painel do API Key Management, copie as seguintes credenciais:
     - **Api Key**
     - **Secret Key**


### 4. Configurando o Servidor

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/rochart-investimentos.git
   cd rochart-investimentos

2. **Configuração do arquivo .env**:
   - Crie um arquivo **.env** na raiz do projeto da pasta **server** com o seguinte formato:
```bash
   MAILJET_API_KEY=your_mailjet_api_key
   MAILJET_SECRET_KEY=your_mailjet_secret_key
   MAILJET_FROM_EMAIL=your_email@example.com

   EMAILJS_API_PUBLIC_KEY=your_emailjs_public_key
   EMAILJS_API_SERVICE_KEY=your_emailjs_service_id
   EMAILJS_API_TEMPLATE_KEY=your_emailjs_template_id

   PORT=5000

