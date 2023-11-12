import { getDones } from "../services/tasksService.js";
import taskItem from "./TaskItem.js";

const undoDoneBtn = document.getElementById("done__icon--undo");
const deleteDoneBtn = document.getElementById("done__icon--delete");
const doneContentList = document.getElementById(
  "content__list--dones",
);

export default async function getDoneTasks() {
  try {
    const tasks = await getDones();
    createDoneTasks(tasks);
  } catch (error) {
    console.error("Error getting completed tasks:", error.message);
  }
}

function createDoneTasks(tasks) {
  doneContentList.innerHTML = "";

  tasks.forEach(task => {
    doneContentList.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isDone: true,
        title: task.title.toString(),
        id: task.id,
      }),
    );
  });
}
