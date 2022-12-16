const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todosContainer = document.getElementById("container");
const activeNumber = document.querySelector(".leftitems");
const modeChanger = document.querySelector(`.article__top--modechanger`);
const header = document.querySelector(`.header`);
const activeBtn = document.querySelector(`.active`);
const completedBtn = document.querySelector(`.completed`);
const allBtn = document.querySelector(`.all`);
const clearComp = document.querySelector(`.clearcompleted`);
const body = document.querySelector(`body`);
const plus = document.querySelector(`.article__center--input0`);
const articleCenter = document.querySelector(`.article__center`);
const articleBottom1 = document.querySelector(`.article__bottom--cont1`);
const articleBottom2 = document.querySelector(`.article__bottom--sort`);

const todoHTMLIncomplete = `
<div class="todo">
<span class="article__center--checkBox11">
<input class="article__center--checkBox1" onChange="saveAsComplete(event)" type="checkbox"  />
</span>
<p id='key'>key</p>
<p class='article__center--input'>The title of the todo</p>
<button id='but' onClick='deleteTodo(event)'>x</button>
</div>
`;

const todoHTMLComplete = `
<div class="todo">
<div class="article__center--checkBox11">
        
<input class="article__center--checkBox1" onChange="saveAsComplete(event)" type="checkbox"  checked="true" />
</div>
<p id='key'>key</p>
<p class='article__center--input completed1'>The title of the todo</p>
<button onClick='deleteTodo(event)'>x</button>
</div>
`;

allBtn.addEventListener(`click`, () => {
  updateTodosHtml();
  activeNumber.innerHTML = `${getActive().length} items left`;
});
const clearComplet = () => {
  if (getCompleted().length > 0) {
    const toDelete = document.querySelectorAll(`.completed1`);
    toDelete.forEach((element) => {
      element.parentElement.parentElement.classList.add(`remove`);
      setTimeout(() => {
        element.parentElement.parentElement.parentElement.removeChild(
          element.parentElement.parentElement
        );
      }, 800);
    });
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const completedTodos = getCompleted();
    completedTodos.map((completedTodo) => {
      todos.map((todo, index) => {
        if (todo.key == completedTodo.key) {
          todos.splice(index, 1);
        }
      });
    });
    localStorage.setItem(`todos`, JSON.stringify(todos));
  }
  if (getActive().length == 0 && getCompleted().length == 0) {
    setTimeout(() => {
      todosContainer.innerHTML = `<p class="article__bottom--cont">No todo items left!</p>`;
    }, 850);
    return false;
  }
};
const clearCompleted = () => {
  clearComplet();
};

clearComp.addEventListener(`click`, () => {
  clearCompleted();
});
const displayTodos = (btn) => {
  const todos = btn == `activebtn` ? getActive() : getCompleted();
  if (todos.length == 0) {
    const el = btn == `activebtn` ? `active` : `completed`;
    alert(`there is no ${el} activities`);
  } else {
    todosContainer.innerHTML = "";
    todos.map((todoo) => {
      const newElementt = document.createElement(`div`);
      newElementt.innerHTML = todoHTMLIncomplete;
      newElementt.querySelector(`#key`).textContent = todoo.key;
      newElementt.querySelector(`.article__center--input`).textContent =
        todoo.content;
      if (btn == `completedbtn`) {
        newElementt
          .querySelector(`.article__center--input`)
          .classList.add(`completed1`);
        newElementt.querySelector(`.article__center--checkBox1`).checked = true;
      }
      todosContainer.appendChild(newElementt);
    });
  }
};

completedBtn.addEventListener(`click`, () => {
  displayTodos(`completedbtn`);
  newElementsChanging();
});

activeBtn.addEventListener(`click`, () => {
  displayTodos(`activebtn`);
  newElementsChanging();
});
addButton.addEventListener("click", () => {
  if (!(document.querySelector(`.article__center--input`).value == ``)) {
    const todos = getTodos();
    const content = todoInput.value;
    const key = Math.random() + 1;
    const todo = {
      key,
      content,
      completed: false,
    };
    if (todo.content) {
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    updateTodo(todo);
  }
  activeNumber.innerHTML = `${getActive().length} items left`;
  if (document.querySelector(`#container p`) && getActive().length == 1) {
    document
      .querySelector(`#container`)
      .removeChild(document.querySelector(`#container p`));
  }
  document.querySelector(`.article__center--input`).value = ``;
  newElementsChanging();
});

window.onload = () => {
  updateTodosHtml();
  mode = localStorage.getItem(`mode`) || `dark`;
  modeChanging(mode);
};

const updateTodosHtml = () => {
  todosContainer.innerHTML = "";
  activeNumber.innerHTML = `${getActive().length} items left`;
  if (getActive().length == 0 && getCompleted().length == 0) {
    todosContainer.innerHTML = `<p class="article__bottom--cont">No todo items left!</p>`;
    return false;
  }
  const todos = getTodos();

  todos.map((todo) => {
    updateTodo(todo);
  });
  const active = getActive();
};

const updateTodo = (todo) => {
  if (getActive().length == 0 && getCompleted().length == 0) {
    todosContainer.innerHTML = `<p class="article__bottom--cont">No todo items left!</p>`;
    return false;
  }

  const newElement = document.createElement("div");
  !todo.completed
    ? (newElement.innerHTML = todoHTMLIncomplete)
    : (newElement.innerHTML = todoHTMLComplete);
  newElement.querySelector(".article__center--input").textContent =
    todo.content;
  newElement.querySelector("#key").textContent = todo.key;
  todosContainer.appendChild(newElement);

  if (getActive().length == 0 && getCompleted().length == 0) {
    setTimeout(() => {
      todosContainer.innerHTML = `<p class="article__bottom--cont">No todo items left!</p>`;
    }, 850);
    return false;
  }
};
const saveAsComplete = (event) => {
  const checkedClass = event.target.parentElement.parentElement.querySelector(
    `.article__center--input`
  );
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.map((todo) => {
    if (
      String(todo.key) ==
      event.target.parentElement.parentElement.querySelector(`#key`).textContent
    ) {
      todo.completed = !todo.completed;
      if (todo.completed) {
        checkedClass.classList.add(`completed1`);
      } else {
        checkedClass.classList.remove(`completed1`);
      }
    }
  });
  localStorage.setItem(`todos`, JSON.stringify(todos));
  activeNumber.innerHTML = `${getActive().length} items left`;
};
const deleteTodo = (event) => {
  const parent = document.querySelector(`.article__bottom--cont1`);
  const child = event.target.parentElement.parentElement;
  const checkedClass = event.target.parentElement.querySelector(
    `.article__center--input`
  );
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.map((todo, index) => {
    if (
      String(todo.key) ==
      event.target.parentElement.parentElement.querySelector(`#key`).textContent
    ) {
      todos.splice(index, 1);
      child.classList.add(`remove`);
      setTimeout(() => {
        parent.removeChild(child);
      }, 800);
    }
    localStorage.setItem(`todos`, JSON.stringify(todos));
    activeNumber.innerHTML = `${getActive().length} items left`;
  });
  if (getActive().length == 0 && getCompleted().length == 0) {
    setTimeout(() => {
      todosContainer.innerHTML = `<p class="article__bottom--cont">No todo items left!</p>`;
    }, 850);
    return false;
  }
};
const getTodos = () => {
  let todos;
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};
const getCompleted = () => {
  const todos = getTodos();
  return todos.filter((todo) => {
    return todo.completed;
  });
};
const getActive = () => {
  const todos = getTodos();
  return todos.filter((todo) => {
    return !todo.completed;
  });
};

modeChanger.addEventListener(`click`, () => {
  if (mode == `dark`) {
    mode = `light`;
  } else {
    mode = `dark`;
  }
  localStorage.setItem("mode", mode);
  modeChanging(mode);
});
const modeChanging = (mode) => {
  headerBackground();
  modeChanger.src = `icon-${mode == "light" ? "moon" : "sun"}.svg`;
  body.style.backgroundColor = `${
    mode == `light` ? "hsl(236, 33%, 92%)" : "hsl(235 ,21%, 11%)"
  }`;
  plus.style.filter = `${mode == `light` ? "invert(0)" : "invert(1)"}`;
  articleCenter.style.backgroundColor = `${
    mode == `light` ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"
  }`;
  articleBottom1.style.backgroundColor = `${
    mode == `light` ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"
  }`;
  articleBottom2.style.backgroundColor = `${
    mode == `light` ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"
  }`;

  newElementsChanging();
};
window.addEventListener(`resize`, () => {
  headerBackground();
});
const headerBackground = () => {
  if (window.matchMedia("(max-width:745px)").matches) {
    console.log(`fggg`);
    header.style = `background-image:url(bg-mobile-${mode}.jpg)`;
  } else {
    header.style = `background-image:url(bg-desktop-${mode}.jpg)`;
  }
};
const newElementsChanging = () => {
  const addElements = document.querySelectorAll(".todo");
  const removeButton = document.querySelectorAll(`#but`);

  addElements.forEach((element) => {
    element.style.backgroundColor = `${
      mode == `light` ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"
    }`;
  });
  removeButton.forEach((element) => {
    element
      ? (element.style.color = `${mode == `light` ? "black" : "white"}`)
      : null;
  });
};
