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


let liTodoPrefix = "todo-";

function addTodoPrefix(id,prefix){
  return id.substring(prefix.length);
}

function removeTodo(event) {
  // let position = event.target.parentElement.id.substring(liTodoPrefix.length);
  let position = addTodoPrefix(event.target.parentElement.id,liTodoPrefix)

  todosObject.remove(position);
  displayTodos();
}

function toggleTodo(event) {
  // todosObject.toggle(event.target.parentElement.id.substring(liTodoPrefix.length));
  todosObject.toggle(addTodoPrefix(event.target.parentElement.id,liTodoPrefix))
  displayTodos();
}

function editTodo(event) {
  // let position = event.target.parentElement.id.substring(liTodoPrefix.length);
  let position = addTodoPrefix(event.target.parentElement.id,liTodoPrefix)
  const newValue = prompt("New Value:", todosObject.todos[position].todoText);

  newValue
    ? todosObject.edit(position, newValue)
    : todosObject.todos[position].todoText;

  displayTodos();
}

function displaylistItem(i,todoLI){
  todosObject.todos[i].complited
  ? (todoLI.innerText = "[x] " + todosObject.todos[i].todoText)
  : (todoLI.innerText = "[] " + todosObject.todos[i].todoText);
}



function displayTodos() {
  let todosUL = document.getElementById("todo-list-ul");
  todosUL.innerHTML = "";


  for (let i = 0; i < todosObject.todos.length; ++i) {
    let todoLI = document.createElement("li");

   displaylistItem(i,todoLI)

    todoLI.id = liTodoPrefix + i;

    todosUL.appendChild(todoLI);

    let removeButton = createRemoveButton()
    todoLI.appendChild(removeButton);
    // removeButton.value = i;

    let toggleButton = createToggleButton()
    todoLI.appendChild(toggleButton);
    // toggleButton.value = i;

    let editButton = createEditButton()
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

function createRemoveButton(){
  let removeButton = createButton("remove");
  return removeButton;
}

function createToggleButton(){
  let toggleButton = createButton("toggle");
  return toggleButton;
}

function createEditButton(){
  let editButton = createButton("edit");
  return editButton;
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

document
  .getElementById("edit-button")
  .addEventListener("click", editTodoButton);

// document.getElementById("remove-button").addEventListener("click", removeTodo);

document
  .getElementById("toggle-button")
  .addEventListener("click", toggleTodoButton);
