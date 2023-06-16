let section = document.querySelector("section");
let add = document.querySelector("form button");

add.addEventListener("click", e => {
    // Prevent Submission
    e.preventDefault();

    let form = e.target.parentElement;

    let todoText = form.children[0].value;

    let todoDate = form.children[1].value;

    let todoMonth = form.children[2].value;

    if (todoText === "" || todoDate === "" || todoMonth === "") {
        alert("Missing Value");
        return;
    }

    let todo = document.createElement("div");

    todo.classList.add("todo");
    
    let text = document.createElement("p");

    text.classList.add("todo-text");

    text.innerText = todoText;

    let time = document.createElement("p");

    time.classList.add("todo-time");

    time.innerText = todoDate + " / " + todoMonth;

    todo.appendChild(text);

    todo.appendChild(time);

    let completeBtn = document.createElement("button");

    completeBtn.classList.add("complete");

    completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';

    completeBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    });

    let trashBtn = document.createElement("button");

    trashBtn.classList.add("trash");

    trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    trashBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;

        todoItem.addEventListener("animationed", () => {
            todoItem.remove();
        })

        todoItem.style.animation = "scaleDown 0.3s forwards";

    })

    todo.appendChild(completeBtn);

    todo.appendChild(trashBtn);

    todo.style.animation = "scaleUp 0.3s forwards";

    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate,
    }

    let mylist = localStorage.getItem("list");

    if (mylist == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(mylist);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }




    section.appendChild(todo);
})