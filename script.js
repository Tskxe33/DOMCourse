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

    {
      todoText: "Item 4",
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

function removeTodo(event) {
  let position = event.target.parentElement.id.slice(liTodoPrefix.length);
  todosObject.remove(position);
}

function toggleTodo(event) {
  let position = event.target.parentElement.id.slice(liTodoPrefix.length);
  todosObject.toggle(position);
}

function displaylistItem(i, todoLI) {
  todosObject.todos[i].complited
    ? (todoLI.innerText = "[x] " + todosObject.todos[i].todoText)
    : (todoLI.innerText = "[] " + todosObject.todos[i].todoText);
}

function displayTodos() {
  let todosUL = document.getElementById("todo-list-ul");
  todosUL.innerHTML = "";

  for (let i = 0; i < todosObject.todos.length; ++i) {
    let todoLI = document.createElement("li");
    todoLI.id = liTodoPrefix + i;
    displaylistItem(i, todoLI);

    todosUL.appendChild(todoLI);

    let removeButton = createRemoveButton();
    todoLI.appendChild(removeButton);
    removeButton.name = `remove`;
    removeButton.classList.add("remove");

    let toggleButton = createToggleButton();
    todoLI.appendChild(toggleButton);
    toggleButton.name = `toggle`;
    toggleButton.classList.add("toggle");

    let editButton = createEditButton();
    todoLI.appendChild(editButton);
    editButton.name = `edit`;
    editButton.classList.add("edit");
    editButton.classList.add("show-modal");
    todoLI.classList.add("li");
  }

  document.querySelector(`.add-button`).classList.remove("hidden");
  document.querySelector(`.toggleAll-button`).classList.remove("hidden");
  document.querySelector(`.add-input `).classList.remove("hidden");
}

function editTodo(event, value) {
  let position = event.target.parentElement.id.substring(liTodoPrefix.length);
  // const newValue = prompt("New Value:", todosObject.todos[position].todoText);
  value
    ? todosObject.edit(position, value)
    : todosObject.todos[position].todoText;

  displayTodos();
}

function edit(event) {
  showModal();
  const form = document.querySelector(".form__edit");
  const newValue = document.getElementById("editTodo");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    editTodo(event, newValue.value);

    // todosObject.edit(position, newValue.value);

    closeModal();
  });
}

document
  .getElementById("todo-list-ul")
  .addEventListener("click", function (event) {
    const target = event.target.name;
    console.log(target);
    if (target === `remove`) {
      removeTodo(event);
    } else if (target === `toggle`) {
      toggleTodo(event);
    } else if (target === `edit`) {
      edit(event);
    }
    displayTodos();
  });

function createButton(text) {
  const button = document.createElement("button");
  button.innerText = text;
  return button;
}

function createRemoveButton() {
  let removeButton = createButton("✖ remove");
  return removeButton;
}

function createToggleButton() {
  let toggleButton = createButton("🔁 toggle");
  return toggleButton;
}

function createEditButton() {
  let editButton = createButton("🖊 edit");
  return editButton;
}

// ---------------- MODAL ------------------
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

function showModal() {
  const btnCloseModal = document.querySelector(".close-modal");
  const btnsOpenModal = document.querySelectorAll(".show-modal");
  for (let i = 0; i < btnsOpenModal.length; i++) openModal();

  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    // console.log(e.key);

    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
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

// function editTodoButton() {
//   const editPositionInput = document.getElementById("edit-position-input");
//   const editTextInput = document.getElementById("edit-text-input");
//   let pos = editPositionInput.value;
//   let newValue = editTextInput.value;
//   todosObject.edit(pos, newValue);

//   editPositionInput.value = "";
//   editTextInput.value = "";
//   displayTodos();
// }

// function toggleTodoButton() {
//   const toggleInput = document.getElementById("toggle-input");

//   let position = toggleInput.value;
//   todosObject.toggle(position);
//   displayTodos();
// }

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

// // document.getElementById("remove-button").addEventListener("click", removeTodo);

// document
//   .getElementById("toggle-button")
//   .addEventListener("click", toggleTodoButton);
