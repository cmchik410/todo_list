let section = document.querySelector("section");
let add = document.querySelector("form button");

add.addEventListener("click", e => {
    // Prevent Submission
    e.preventDefault();

    let form = e.target.parentElement;

    let todoText = form.children[0].value;

    let todoMonth = form.children[1].value;

    let todoDate = form.children[2].value;

    let todo = document.createElement("div");

    todo.classList.add("todo");
    
    let text = document.createElement("p");

    text.classList.add("todo-text");

    text.innerText = todoText;

    let time = document.createElement("p");

    time.classList.add("todo-time");

    time.innerText = todoMonth + " / " + todoDate;

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
        todoItem.style.animation = "scaleDown 0.3s forwards";
        todoItem.remove();
    })


    todo.appendChild(completeBtn);

    todo.appendChild(trashBtn);

    todo.style.animation = "scaleUp 0.3s forwards";

    section.appendChild(todo);
})