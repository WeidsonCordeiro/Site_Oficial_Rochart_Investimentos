import { validateEmail } from './validationEmail.js';

(function () {
    'use strict'

    let env; // Declare a variável `env` no escopo global da função

    const getEnv = async () => {
        try {
            let response = await fetch('/api/env');
            env = await response.json(); // Atribua o valor de `env` aqui
            emailjs.init({ publicKey: env.EMAILJS_API_PUBLIC_KEY }); // Inicialize o EmailJS após obter `env`
        } catch (error) {
            console.error('Erro ao buscar variáveis de ambiente:', error);
        }
    };

    getEnv();

    const vForm = document.querySelector('.handleSubmitContato');

    vForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        const closeModal = document.getElementById('close-modal');
        const inputs = document.querySelectorAll('.input-field');
        let templateParams = {};
        let hasError = false;


        function showError(divError, message) {
            divError.parentElement.querySelector(".errormsg").style.display = "block";
            divError.parentElement.querySelector(".errormsg").querySelector("p").innerText = message;
            hasError = true;
        }

        function hideError(divError) {
            divError.parentElement.querySelector(".errormsg").style.display = "none";
        }

        inputs.forEach((input) => {

            if (!input.value.trim()) {
                showError(input, "Campo obrigatório");
            } else if (input.getAttribute("type") === "email") {
                if (!validateEmail(input.value.trim())) {
                    showError(input, "Por favor, insira um e-mail válido.");
                } else {
                    hideError(input);
                    templateParams[input.getAttribute("id")] = input.value;
                }
            } else {
                hideError(input);
                templateParams[input.getAttribute("id")] = input.value;
            }

        });

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
            // Mostrar mensagem de carregamento
            showModal('Aguardando envio...');

            try {
                const response = await emailjs.send(env.EMAILJS_API_SERVICE_KEY, env.EMAILJS_API_TEMPLATE_SITE_ROCHARTE_KEY, templateParams);
                console.log('SUCCESS!', response.status, response.text);
                showModal('Email enviado com sucesso!', true); // Sucesso
                vForm.reset();
            } catch (error) {
                console.error('FAILED...', error);
                showModal('Erro ao enviar o email. Tente novamente!', true); // Erro
            }
        }

    });

})()