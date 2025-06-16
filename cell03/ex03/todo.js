// Cookie helper functions
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (encodeURIComponent(value) || "")  + expires + "; path=/";
}
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
  }
  return null;
}

const ft_list = document.getElementById('ft_list');
const newBtn = document.getElementById('new-btn');

// Load todos from cookie
function loadTodos() {
  ft_list.innerHTML = '';
  const todos = getCookie('todos');
  if (todos) {
    try {
      const arr = JSON.parse(todos);
      arr.forEach(todo => addTodo(todo, false));
    } catch (e) {}
  }
}

// Save todos to cookie
function saveTodos() {
  const todos = [];
  ft_list.querySelectorAll('.todo').forEach(div => {
    todos.push(div.textContent);
  });
  setCookie('todos', JSON.stringify(todos.reverse()), 365);
}

// Add todo to DOM
function addTodo(text, save=true) {
  if (!text) return;
  const div = document.createElement('div');
  div.className = 'todo';
  div.textContent = text;
  div.onclick = function() {
    if (confirm('Do you want to remove this TO DO?')) {
      div.remove();
      saveTodos();
    }
  };
  ft_list.appendChild(div);
  if (save) saveTodos();
}

// New button event
newBtn.onclick = function() {
  const todo = prompt('Enter a new TO DO:');
  if (todo && todo.trim() !== '') {
    addTodo(todo.trim());
  }
};

// On load
loadTodos();