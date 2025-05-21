document.addEventListener('DOMContentLoaded', () => {
  const todolist = document.getElementById('todo-list');
  const taskinput = document.getElementById('taskInput');
  const addtaskbtn = document.getElementById('add-task-btn');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task) => renderTask(task));

  addtaskbtn.addEventListener('click', () => {
    const taskText = taskinput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      isCompleted: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    taskinput.value = "";

    taskinput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
    addtaskbtn.click();
  }
    });
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.isCompleted) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todolist.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
