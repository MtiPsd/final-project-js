import { getDones } from "../services/tasksService";

const contentList = document.getElementById("content__list");
const undoDoneBtn = document.getElementById("done__icon--undo");
const deleteDoneBtn = document.getElementById("done__icon--delete");

async function renderDonesUI() {
  const tasks = await getDones();
  createDoneTasks(tasks);
}

function createDoneTasks(tasks) {
  contentList.innerHTML = "";

  tasks.forEach(task => {
    contentList.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isDone: true,
        title: task.title.toString(),
      }),
    );
  });
}

export default renderDonesUI;
