export function clearInput(input) {
  input.value = "";
  input.focus();
}

export function handleModal() {
  const modal = document.getElementById("modal");

  document
    .getElementById("modal--cancel")
    .addEventListener("click", function () {
      modal.style.display = "none";
    });

  document
    .getElementById("close-modal-btn")
    .addEventListener("click", function () {
      modal.style.display = "none";
    });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

export function closeModal(modal) {
  modal.style.display = "none";
}

export function openModal(modal) {
  modal.style.display = "block";
}
