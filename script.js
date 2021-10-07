"use strict";
const todosObject = {
  todos: [
    {
      todoText: "Item 1",
      complited: false,
    },

    {
      todoText: "Item 2",
      complited: false,
    },

    {
      todoText: "Item 3",
      complited: false,
    },
  ],

  add(initialTodoText) {
    this.todos.push({ todoText: initialTodoText, complited: false });
  },

  edit(pos, newValue) {
    this.todos[pos].todoText = newValue;
  },

  remove(pos) {
    this.todos.splice(pos, 1);
  },

  toggle(position) {
    this.todos[position].complited = !this.todos[position].complited;
  },

  toggleAll() {
    let toggleTo = !isAllComplited();
    for (let i = 0; i < this.todos.length; ++i) {
      this.todos[i].complited = toggleTo;
    }
  },
};

function removeTodo(event) {
  todosObject.remove(event.target.value);
  displayTodos();
}

function toggleTodo(event) {
  todosObject.toggle(event.target.value);
  displayTodos();
}

function addTodo() {
  const addInput = document.getElementById("add-input");
  let initialTodoText = addInput.value;
  todosObject.add(initialTodoText);
  addInput.value = "";
  displayTodos();
}

function editTodo() {
  const editPositionInput = document.getElementById("edit-position-input");
  const editTextInput = document.getElementById("edit-text-input");
  let pos = editPositionInput.value;
  let newValue = editTextInput.value;
  todosObject.edit(pos, newValue);

  editPositionInput.value = "";
  editTextInput.value = "";
  displayTodos();
}

function displayTodos() {
  let todosUL = document.getElementById("todo-list-ul");
  todosUL.innerHTML = "";

  for (let i = 0; i < todosObject.todos.length; ++i) {
    const todoLI = document.createElement("li");

    todosObject.todos[i].complited
      ? (todoLI.innerText = "[x] " + todosObject.todos[i].todoText)
      : (todoLI.innerText = "[] " + todosObject.todos[i].todoText);

    todosUL.appendChild(todoLI);

    let removeButton = createButton("remove");
    todoLI.appendChild(removeButton);
    removeButton.value = i;

    let toggleButton = createButton("toggle");
    todoLI.appendChild(toggleButton);
    toggleButton.value = i;

    removeButton.addEventListener("click", removeTodo);
    toggleButton.addEventListener("click", toggleTodo);
  }
}

function createButton(text) {
  const button = document.createElement("button");
  button.innerText = text;
  return button;
}

// function removeTodo(event) {
//   console.log(`New remove function is running`);

//   let position = event.target.value;
//   todosObject.remove(position, 1);
//   displayTodos();
// }

// function removeTodo() {
//   const removeInput = document.getElementById("remove-input");

//   todosObject.remove(removeInput.value);
//   // todos.splice(removeInput.value, 1);
//   removeInput.value = "";
// }

function toggleTodoButton() {
  const toggleInput = document.getElementById("toggle-input");

  let position = toggleInput.value;
  todosObject.toggle(position);
  displayTodos();
}

function toggleAllTodos() {
  todosObject.toggleAll();
  displayTodos();
}

function isAllComplited() {
  for (let i = 0; i < todosObject.todos.length; ++i) {
    if (todosObject.todos[i].complited === false) {
      return false;
    }
  }
  return true;
}

document
  .getElementById("display-todos-button")
  .addEventListener("click", displayTodos);

document
  .getElementById("toggleAll-button")
  .addEventListener("click", toggleAllTodos);

document.getElementById("add-button").addEventListener("click", addTodo);

document.getElementById("edit-button").addEventListener("click", editTodo);

// document.getElementById("remove-button").addEventListener("click", removeTodo);

document
  .getElementById("toggle-button")
  .addEventListener("click", toggleTodoButton);
