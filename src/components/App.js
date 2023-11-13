import { handleModal } from "../utils/utils.js";
import { getCompletedTasks } from "./CompletedTasks.js";
import { getCurrentTasks } from "./CurrentTasks.js";

export function runApp() {
  document.addEventListener("DOMContentLoaded", async () => {
    const todosContent = document.getElementById("todos-content");
    const completedContent = document.getElementById(
      "completed-content",
    );
    const showCurrent = document.getElementById("current-toggle");
    const showCompleted = document.getElementById("completed-toggle");

    // show items when page loads
    await getCurrentTasks();

    let isShowingTodos = true;

    showCurrent.addEventListener("click", async () => {
      if (!isShowingTodos) {
        todosContent.style.display = "block";
        completedContent.style.display = "none";
        isShowingTodos = true;
        await getCurrentTasks();
      }
    });

    showCompleted.addEventListener("click", async () => {
      if (isShowingTodos) {
        todosContent.style.display = "none";
        completedContent.style.display = "block";
        isShowingTodos = false;
        await getCompletedTasks();
      }
    });

    // handles modal state
    handleModal();
  });
}
