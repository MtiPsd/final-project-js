export function clearInput(input) {
  input.value = "";
  input.focus();
}

export function handleDelegation(e, selector, actionCallback) {
  const target = e.target;

  if (target.matches(selector)) {
    const taskId = target.parentElement.dataset.id;
    actionCallback(taskId);
  }
}

////////////////////////// spinner & loading //////////////////////////

export function showLoading(taskId) {
  document
    .querySelector(`[data-id="${taskId}"]`)
    .parentElement.classList.add("loading");
}

export function hideLoading(taskId) {
  document
    .querySelector(`[data-id="${taskId}"]`)
    .parentElement.classList.remove("loading");
}

export function showCurrentSpinner(contentList) {
  contentList.style.display = "none";
  document
    .querySelector(".content__spinner--current")
    .classList.add("spinner");
}

export function hideCurrentSpinner(contentList) {
  contentList.style.display = "block";
  document
    .querySelector(".content__spinner--current")
    .classList.remove("spinner");
}

export function showCompletedSpinner(contentList) {
  contentList.style.display = "none";
  document
    .querySelector(".content__spinner--completed")
    .classList.add("spinner");
}

export function hideCompletedSpinner(contentList) {
  contentList.style.display = "block";
  document
    .querySelector(".content__spinner--completed")
    .classList.remove("spinner");
}
