const modal = document.getElementById("modal");
const saveChangesBtn = document.getElementById("modal--save");

export function closeModal() {
  modal.style.display = "none";
}

export function openModal() {
  modal.style.display = "block";
}

export function clearModalInput() {
  modal.value = "";
}

export function handleOpenModal(list) {
  list.addEventListener("click", e => {
    const target = e.target;
    if (target.matches("#icon--edit")) {
      saveChangesBtn.dataset.id = target.parentElement.dataset.id;
      openModal();
    }
  });
}

export function displayModal() {
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
