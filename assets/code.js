const addButton = document.querySelector(".addButton");
var input = document.querySelector(".input");
const container = document.querySelector(".container");

class item {
  constructor(itemName) {
    this.createDiv(itemName);
  }
  createDiv(itemName) {
    let input = document.createElement("input");
    input.value = itemName;
    input.disabled = true;
    input.classList.add("item_input");
    input.type = "text";

    let itemBox = document.createElement("div");
    itemBox.classList.add("item");

    let editButton = document.createElement("button");
    editButton.innerHTML = "EDIT";
    editButton.classList.add("editButton");

    let doneButton = document.createElement("button");
    doneButton.innerHTML = "DONE";
    doneButton.classList.add("doneButton");

    let removeButton = document.createElement("button");
    removeButton.innerHTML = "REMOVE";
    removeButton.classList.add("removeButton");

    container.appendChild(itemBox);

    itemBox.appendChild(input);
    itemBox.appendChild(editButton);
    itemBox.appendChild(doneButton);
    itemBox.appendChild(removeButton);

    editButton.addEventListener("click", () => this.edit(input));

    removeButton.addEventListener("click", () =>
      this.remove(itemBox, input.value)
    );

    doneButton.addEventListener("click", () => {
      input.style.textDecoration = "line-through";
      fetch("http://localhost:3000/api/modifyState", {
        method: "put",
        // body: JSON.stringify({ done: false, done: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  }

  async edit(input) {
    const newInput = prompt("Enter new msg:", input.value);
    const oldInput = input.value;
    console.log("====================================");
    console.log(oldInput);
    console.log("====================================");
    input.value = newInput;
    await fetch("http://localhost:3000/api/modify", {
      method: "put",
      body: JSON.stringify({ old: oldInput, new: newInput }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async remove(item, value) {
    container.removeChild(item);
    await fetch("http://localhost:3000/api/delete", {
      method: "delete",
      body: JSON.stringify({ note: value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

async function check() {
  if (input.value != "") {
    new item(input.value);

    await fetch("http://localhost:3000/api/create", {
      method: "POST",
      body: JSON.stringify({ note: input.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    input.value = "";
  }
}

async function boot() {
  const records = await fetch("http://localhost:3000/api/get").then((t) =>
    t.json()
  );
  records.forEach(({ note }) => {
    new item(note);
  });
}

boot();

addButton.addEventListener("click", check);

window.addEventListener("keydown", (e) => {
  if (e.which == 13) {
    check();
  }
});
