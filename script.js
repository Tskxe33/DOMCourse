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
  let position = event.target.parentElement.id.slice("todo-".length);
  todosObject.remove(position);
  displayTodos();
}

function toggleTodo(event) {
  todosObject.toggle(event.target.parentElement.id.substring("todo-".length));
  displayTodos();
}

function editTodo(event) {
  let position = event.target.parentElement.id.substring("todo-".length);
  console.log(position);
  const newValue = prompt("New Value:", todosObject.todos[position].todoText);

  newValue
    ? todosObject.edit(position, newValue)
    : todosObject.todos[position].todoText;

  displayTodos();
}

function displayTodos() {
  let todosUL = document.getElementById("todo-list-ul");
  todosUL.innerHTML = "";

  let liTodoId = "todo-";

  for (let i = 0; i < todosObject.todos.length; ++i) {
    let todoLI = document.createElement("li");

    todosObject.todos[i].complited
      ? (todoLI.innerText = "[x] " + todosObject.todos[i].todoText)
      : (todoLI.innerText = "[] " + todosObject.todos[i].todoText);

    todoLI.id = liTodoId + i;

    todosUL.appendChild(todoLI);

    let removeButton = createButton("remove");
    todoLI.appendChild(removeButton);
    // removeButton.value = i;

    let toggleButton = createButton("toggle");
    todoLI.appendChild(toggleButton);
    // toggleButton.value = i;

    let editButton = createButton("edit");
    todoLI.appendChild(editButton);
    // editButton.value = i;

    removeButton.addEventListener("click", removeTodo);
    toggleButton.addEventListener("click", toggleTodo);
    editButton.addEventListener("click", editTodo);
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

function addTodoButton() {
  const addInput = document.getElementById("add-input");
  let initialTodoText = addInput.value;
  todosObject.add(initialTodoText);
  addInput.value = "";
  displayTodos();
}

function editTodoButton() {
  const editPositionInput = document.getElementById("edit-position-input");
  const editTextInput = document.getElementById("edit-text-input");
  let pos = editPositionInput.value;
  let newValue = editTextInput.value;
  todosObject.edit(pos, newValue);

  editPositionInput.value = "";
  editTextInput.value = "";
  displayTodos();
}

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

document.getElementById("add-button").addEventListener("click", addTodoButton);

// document
//   .getElementById("edit-button")
//   .addEventListener("click", editTodoButton);

// document.getElementById("remove-button").addEventListener("click", removeTodo);

document
  .getElementById("toggle-button")
  .addEventListener("click", toggleTodoButton);
