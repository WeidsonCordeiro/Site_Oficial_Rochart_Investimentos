import { validateEmail } from './validationEmail.js';

(function () {
    'use strict'
    const vForm = document.querySelector('.handleSubmitContato');
    const API_PUBLIC_KEY = "";
    const API_SERVICE_KEY = "";
    const API_TEMPLATE_KEY = "";

    emailjs.init({ publicKey: API_PUBLIC_KEY });

    vForm.addEventListener("submit", function (e) {
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

            emailjs.send(API_SERVICE_KEY, API_TEMPLATE_KEY, templateParams).then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    showModal('Email enviado com sucesso!', true); // Sucesso
                    vForm.reset();
                },
                (error) => {
                    console.log('FAILED...', error);
                    showModal('Erro ao enviar o email. Tente novamente!', true); // Erro
                },
            );

        }

    });

})()