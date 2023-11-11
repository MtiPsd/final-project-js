function Todo() {
  return `
      <div class="content" id="todos-content">
           <h1 class="heading-1">Things to do:</h1>
        
          <!-- ------------ input & button ------------ -->
           <div class="task__wrapper">
             <input
               type="text"
               class="task--input"
               placeholder="Type ..."
             />
             <button class="task--btn">Add Task</button>
           </div>
        
          <div class="devider"></div>
        
            <!-- ------------ task list & items ------------ -->
        
          <ul class="content__list" id="content__list">VRIRIRI</ul>
      </div>
`;
}

export default Todo;
