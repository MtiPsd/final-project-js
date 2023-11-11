function Sidebar() {
  return `
  
  <div class="sidebar">
  <div class="title">
    <box-icon name="category-alt" rotate="90"></box-icon>
    <p>ToDo List</p>
  </div>
  <div class="sidebar__devider"></div>
  <a class="sidebar__btn" href="#/">
    <box-icon name="list-ul"></box-icon>
    <p>Tasks</p>
  </a>
  <a class="sidebar__btn" href="#/dones">
    <box-icon name="task"></box-icon>
    <p>Done</p>
  </a>
</div>
  `;
}

export default Sidebar;
