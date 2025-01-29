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

            // Mostrar mensagem de carregamento
            //showModal('Aguardando envio...');
            console.log("Falta implementar o envio para o servidor");
            vForm.reset();
        }
    });

})()
