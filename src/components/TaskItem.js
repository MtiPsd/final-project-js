function taskItem({ iscompleted, title, id }) {
  return `
    <li class="content__item" >
      <p>${title}</p>
    
      <div class="icons" data-id="${id}">
        ${
          !iscompleted
            ? `<div class="icon icon--check" id="icon--check" >
                <box-icon name="check" id="box-icon"></box-icon>
               </div>
    
               <div class="icon icon--edit" id="icon--edit">
                 <box-icon name="edit-alt" id="box-icon"></box-icon>
               </div>
               
               <div class="icon icon--delete" id="icon--delete">
                 <box-icon name="trash" id="box-icon"></box-icon>
               </div>
               `
            : `
               <div class="icon completed__icon--undo" id="completed__icon--undo">
                <box-icon name="undo" id="box-icon"></box-icon>
               </div>
              
              <div class="icon completed__icon--delete" id="completed__icon--delete">
               <box-icon name="trash" id="box-icon"></box-icon>
              </div>
              `
        }
      </div>
    </li>
  `;
}

export default taskItem;
