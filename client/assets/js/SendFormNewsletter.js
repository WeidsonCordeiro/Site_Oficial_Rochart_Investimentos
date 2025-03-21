import { validateEmail } from './validationEmail.js';

(function () {
    'use strict'
    const vForm = document.querySelector('.handleSubmitNewsletter');


    vForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const inputEmail = document.querySelector('#emailInput');
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        const closeModal = document.getElementById('close-modal');
        let hasError = false;

        function showError(divError, message) {
            divError.parentElement.parentElement.querySelector(".errormsg").style.display = "block";
            divError.parentElement.parentElement.querySelector(".errormsg").querySelector("p").innerText = message;
            hasError = true;
        }

        function hideError(divError) {
            divError.parentElement.parentElement.querySelector(".errormsg").style.display = "none";
        }

        if (!inputEmail.value.trim()) {
            showError(inputEmail, "Campo obrigatório");
        } else if (!validateEmail(inputEmail.value.trim())) {
            showError(inputEmail, "Por favor, insira um e-mail válido.");
        } else {
            hideError(inputEmail);
        }

        // Mostrar o modal
        function showModal(message, showButton = false) {
            modalMessage.textContent = message;
            modal.style.display = 'flex';
            closeModal.style.display = showButton ? 'block' : 'none';
        }

        // Fechar o modal
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';

        });

        if (!hasError) {

            let subject = "Subscrição Newsletter";
            let message = `
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
                Desenvolvedor Front-End | Tecnologia & Inovação</em>
            </p>
            `;

            showModal('Aguardando envio...');

            async function carregarNewsletters() {
                try {
                    const resposta = await fetch(`/api/send-newsletter`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ to: inputEmail.value.trim(), subject, message })
                    });

                    const response = await resposta.json();
                    showModal('Subscrito com sucesso!', true);
                    vForm.reset();

                } catch (error) {
                    console.error('Erro ao subscrever ao newsletter:', error);
                    showModal('Erro ao subscrever ao newsletter. Tente novamente!', true);
                }
            }

            carregarNewsletters();
        }
    });

})()
