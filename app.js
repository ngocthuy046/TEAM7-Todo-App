let todos = [];

function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value;
  if (todoText !== '') {
    todos.push({ text: todoText, isDone: false });
    todoInput.value = '';
    renderTodo();
  }
}

function editTodo(index) {
  const todoInput = document.getElementById('todoInput');
  todoInput.value = todos[index].text;
  todoInput.focus();

  document.getElementById('todoInput').addEventListener('keyup', function updateTodoOnEnter(event) {
    if (event.key === 'Enter') {
      todos[index].text = todoInput.value;
      renderTodo();
      todoInput.value = '';
      todoInput.removeEventListener('keyup', updateTodoOnEnter);
    }
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodo();
}

function toggleTodo(index) {
  const selectedTodo = todos[index];
  todos.splice(index, 1);
  selectedTodo.isDone = !selectedTodo.isDone;
  todos.push(selectedTodo);
  renderTodo();
}

function renderTodo() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  const filteredTodos = getFilteredTodo();

  filteredTodos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.className = `list-group-item d-flex justify-content-between align-items-center ${todo.isDone ? 'list-group-item-success' : ''}`;
    const todoCheckbox = document.createElement('div');
    todoCheckbox.className = 'form-check';
    const todoCheckboxInput = document.createElement('input');
    todoCheckboxInput.type = 'checkbox';
    todoCheckboxInput.className = 'form-check-input';
    todoCheckboxInput.checked = todo.isDone;
    todoCheckboxInput.onclick = () => toggleTodo(index);
    const todoCheckboxLabel = document.createElement('label');
    todoCheckboxLabel.textContent = todo.text;
    todoCheckbox.appendChild(todoCheckboxInput);
    todoCheckbox.appendChild(todoCheckboxLabel);
    const todoActions = document.createElement('div');
    const editButton = document.createElement('button');
    editButton.className = 'btn btn-sm btn-outline-primary mr-2';
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTodo(index);
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-outline-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTodo(index);
    todoActions.appendChild(editButton);
    todoActions.appendChild(deleteButton);
    todoItem.appendChild(todoCheckbox);
    todoItem.appendChild(todoActions);
    todoList.appendChild(todoItem);
  });
}

function getFilteredTodo() {
  const filterSelect = document.getElementById('filterSelect');
  const filterValue = filterSelect.value;

  if (filterValue === 'all') {
    return todos;
  } else if (filterValue === 'done') {
    return todos.filter(todo => todo.isDone);
  } else {
    return todos.filter(todo => !todo.isDone);
  }
}

function cancelTodo() {
  const todoInput = document.getElementById("todoInput");
  todoInput.value = ""; 
}