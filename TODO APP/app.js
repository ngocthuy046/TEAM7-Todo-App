let todos = [];

function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    todos.push({ text: todoText, isDone: false });
    todoInput.value = '';
    renderTodos();
  }
}

function editTodo(index) {
  const todoInput = document.getElementById('todoInput');
  todoInput.value = todos[index].text;
  todoInput.focus();

  document.getElementById('todoInput').addEventListener('keyup', function updateTodoOnEnter(event) {
    if (event.key === 'Enter') {
      todos[index].text = todoInput.value;
      renderTodos();
      todoInput.value = '';
      todoInput.removeEventListener('keyup', updateTodoOnEnter);
    }
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleTodo(index) {
  todos[index].isDone = !todos[index].isDone;
  renderTodos();
}

function filterTodos() {
  const filterSelect = document.getElementById('filterSelect');
  const filterValue = filterSelect.value;
  renderTodos();
}

function renderTodos() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  const filteredTodos = getFilteredTodos();

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
    todoCheckboxLabel.className = 'form-check-label';
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

function getFilteredTodos() {
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
  todoInput.value = ""; // Clear the input field
}