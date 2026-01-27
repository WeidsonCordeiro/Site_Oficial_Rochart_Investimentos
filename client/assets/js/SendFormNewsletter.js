import { validateEmail } from "./validationEmail.js";
import { requestConfig, apiUrl } from "../utils/config.js";

(function () {
  "use strict";
  const vForm = document.querySelector(".handleSubmitNewsletter");

  vForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const inputEmail = document.querySelector("#emailInput");
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeModal = document.getElementById("close-modal");
    let hasError = false;

    function showError(divError, message) {
      divError.parentElement.parentElement.querySelector(
        ".errormsg",
      ).style.display = "block";
      divError.parentElement.parentElement
        .querySelector(".errormsg")
        .querySelector("p").innerText = message;
      hasError = true;
    }

    function hideError(divError) {
      divError.parentElement.parentElement.querySelector(
        ".errormsg",
      ).style.display = "none";
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
        to: inputEmail.value.trim(),
      };

      async function carregarNewsletters() {
        const config = requestConfig("POST", formData, null);
        try {
          const res = await fetch(`${apiUrl}api/sendNewsLetter`, config);

          const result = await res.json();

          if (result.errors) {
            console.error("Erro ao subscrever ao newsletter:", result.errors);
            return;
          }

          showModal("Subscrito com sucesso!", true);
          console.log("Subscrito com sucesso ao newsletter", result);
          vForm.reset();
        } catch (error) {
          console.error("Erro ao subscrever ao newsletter:", error);
          showModal("Erro ao subscrever ao newsletter. Tente novamente!", true);
        }
      }

      carregarNewsletters();
    }
  });
})();
