
<p align="center">
  <img src="https://github.com/user-attachments/assets/45587d17-d32d-4911-8759-1ac8d8eee114" alt="image"/>
</p>


# Site Oficial Rochart Investimentos

Este projeto é um site Fullstach com funcionalidades de envio de contato e subscrição de newsletter utilizando a API do Mailjet.

---

## 🚀 Funcionalidades

- **Envio de Contato**: Permite que os usuários enviem mensagens diretamente para o administrador do site.
- **Subscrição de Newsletter**: Permite que os usuários se inscrevam para receber newsletters.

---

## 🛠️ Configuração do Projeto

### 1. Pré-requisitos

- Node.js instalado ([Download Node.js](https://nodejs.org/))
- Conta no [Mailjet](https://app.mailjet.com/signin/)
- Editor de código (recomendado: [Visual Studio Code](https://code.visualstudio.com/))

---

### 2. Configurando o Mailjet

1. **Crie uma conta no EmailJS**:
   - Acesse [Mailjet](https://app.mailjet.com/signin/) e crie uma conta gratuita.

2. **Obtenha suas credenciais**:
   - No painel do API Key Management, copie as seguintes credenciais:
     - **Api Key**
     - **Secret Key**


### 3. Configurando o Servidor

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
   MAILJET_CONTACTS_NEWSLLETTERS_LIST_ID="your_ID"

   PORT=5000

