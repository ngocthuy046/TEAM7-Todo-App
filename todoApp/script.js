document.addEventListener("DOMContentLoaded", function () {
    let todos = [];
    let editingIndex = -1;

    const taskNameInput = document.getElementById("taskName");
    const addTaskButton = document.getElementById("addTask");
    const cancelEditButton = document.getElementById("cancelEdit");
    const todoList = document.getElementById("todoList");
    const filter = document.getElementById("filter");

    addTaskButton.addEventListener("click", addOrEditTask);
    cancelEditButton.addEventListener("click", cancelEdit);
    filter.addEventListener("change", renderList);

    function addOrEditTask() {
        const taskName = taskNameInput.value.trim();
        if (taskName) {
            if (editingIndex === -1) {
                todos.push({ name: taskName, done: false });
            } else {
                todos[editingIndex].name = taskName;
                editingIndex = -1;
                addTaskButton.textContent = "Add";
            }
            taskNameInput.value = "";
            renderList();
        }
    }

    function cancelEdit() {
        taskNameInput.value = "";
        editingIndex = -1;
        addTaskButton.textContent = "Add";
    }

    function editTask(index) {
        taskNameInput.value = todos[index].name;
        editingIndex = index;
        addTaskButton.textContent = "Save";
    }

    function deleteTask(index) {
        todos.splice(index, 1);
        renderList();
    }

    function renderList() {
        const filterValue = filter.value;
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            if (
                // filterValue === "all"
                filterValue === "all" ||
                (filterValue === "done" && todo.done) ||
                (filterValue === "undone" && !todo.done)
            ) {
                const li = document.createElement("li");
                li.innerHTML = `
                  <input type="checkbox" class="check-box" onclick="toggleTask(${index})">
                  <span>${todo.name}</span>
                  <div>
                      <button class="edit" onclick="editTask(${index})">Edit</button>
                      <button class="delete" onclick="deleteTask(${index})">Delete</button>
                  </div>
                `
                ;
                todoList.appendChild(li);
            }
        });
    }

    window.editTask = editTask;
    window.deleteTask = deleteTask;

    renderList();
});
