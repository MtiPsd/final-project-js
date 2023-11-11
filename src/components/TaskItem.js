function taskItem({ isDone, title, id }) {
  return `
    <li class="content__item" >
      <p>${title}</p>
    
      <div class="icons" data-id="${id}">
        ${
          !isDone
            ? `<div class="icon icon--check" id="icon--check" >
                <box-icon name="check"></box-icon>
               </div>
    
               <div class="icon icon--edit" id="icon--edit">
                 <box-icon name="edit-alt"></box-icon>
               </div>
               
               <div class="icon icon--delete" id="icon--delete">
                 <box-icon name="trash"></box-icon>
               </div>
               `
            : `
               <div class="icon done__icon--undo" id="done__icon--undo">
                <box-icon name="undo"></box-icon>
               </div>
              
              <div class="icon done__icon--delete" id="done__icon--delete">
               <box-icon name="trash"></box-icon>
              </div>
              `
        }
      </div>
    </li>
  `;
}

export default taskItem;
