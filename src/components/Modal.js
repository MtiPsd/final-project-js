const modal = document.getElementById("modal");
const saveChangesBtn = document.getElementById("modal--save");

export function closeModal() {
  modal.style.display = "none";
}

export function openModal() {
  modal.style.display = "block";
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
