const form = document.getElementById("form");
const input = document.getElementById("add-item-input");
const list = document.querySelector("#list");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addItem(e.target[0].value);
  });
}

let todos = [];

const addItem = (value) => {
  const newItem = {
    id: Date.now(),
    name: value,
  };
  todos.push(newItem);
  addToLocalStorage(todos);
  console.log("adding values", todos);
  input.value = "";
};

function addToLocalStorage(todos) {
  // taking items from local storage
  localStorage.setItem("todo-list", JSON.stringify(todos));
  renderTodos(todos);
}

const renderTodos = (todos) => {
  list.innerHTML = "";

  todos.forEach(function (item) {
    const listItemDiv = document.createElement("div");

    // List items classname and data key
    listItemDiv.className = "list-item";
    listItemDiv.setAttribute('data-key', item.id)

    // list items content
    const text = document.createElement("p");
    text.innerText = item.name;

    // list items delete btn
    const button = document.createElement("button");
    button.className = "delete-btn";
    button.innerText = "X";

    listItemDiv.appendChild(text);
    listItemDiv.appendChild(button);

    list.appendChild(listItemDiv);
  });
};

const getFromLocalStorage = () => {
  let storedItems = window.localStorage.getItem("todo-list");
  if (storedItems) {
    todos = JSON.parse(storedItems);
  }
  renderTodos(todos);
};

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}

getFromLocalStorage();

list.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    console.log('deleting', event.target.classList)
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});
