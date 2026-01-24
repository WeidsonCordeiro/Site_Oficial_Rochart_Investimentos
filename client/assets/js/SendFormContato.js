import { validateEmail } from "./validationEmail.js";
import { requestConfig, apiUrl } from "../utils/config.js";

(function () {
  "use strict";

  const vForm = document.querySelector(".handleSubmitContato");

  vForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeModal = document.getElementById("close-modal");
    const inputs = document.querySelectorAll(".input-field");

    let templateParams = {};
    let hasError = false;

    function showError(divError, message) {
      divError.parentElement.querySelector(".errormsg").style.display = "block";
      divError.parentElement
        .querySelector(".errormsg")
        .querySelector("p").innerText = message;
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
      modal.style.display = "flex";
      closeModal.style.display = showButton ? "block" : "none";
    }

    // Fechar o modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    if (!hasError) {
      showModal("Aguardando envio...");

      const formData = {
        name: templateParams.nome,
        email: templateParams.email,
        phone: templateParams.telefone,
        message: templateParams.mensagem,
      };

      const config = requestConfig("POST", formData, null);
      async function sendEmail() {
        try {
          const res = await fetch(`${apiUrl}/api/sendEmailContacto`, config);

          const result = await res.json();

          if (result.errors) {
            console.error("Erro ao subscrever ao newsletter:", result.errors);
            return;
          }

          console.log("Resultado do envio do email:", result);
          showModal("E-mail enviado com sucesso!", true);
          vForm.reset();
        } catch (error) {
          showModal("Erro ao enviar o email. Tente novamente!", true);
        }
      }

      sendEmail();
    }
  });
})();
