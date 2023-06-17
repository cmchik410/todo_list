let section = document.querySelector("section");
let add = document.querySelector("form button");


add.addEventListener("click", e => {

    e.preventDefault();

    let form = e.target.parentElement;

    let newTodo = {
        todoText: form.children[0].value,
        todoMonth: form.children[1].value,
        todoDate: form.children[2].value
    };
    
    if (newTodo.todoText === "" || newTodo.todoMonth === "" || newTodo.todoDate === "") {
        alert("Missing value");
        return;
    }

    let todoCell = create_todo(newTodo);

    let todoList = localStorage.getItem("todolist");

    if (todoList == null) {
        localStorage.setItem("todoList", JSON.stringify([newTodo]));
    } else {
        let newTodoList = JSON.parse(todoList);
        newTodoList.push(newTodo);
        localStorage.setItem("list", JSON.stringify(newTodoList));
    }

    section.appendChild(todoCell);
})

loadData();


function create_todo(item) {
    let todoCell = document.createElement("div");
    todoCell.classList.add("todo");

    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.todoText

    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = item.todoDate + " / " + item.todoMonth;

    todoCell.append(text);
    todoCell.append(time);

    let completeBtn = document.createElement("button");
    completeBtn.classList.add("complete");
    completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    completeBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })

    let trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;

        todoItem.addEventListener("animationend", () => {
            let text = todoItem.children[0].innerText;
            let currListArray = JSON.parse(localStorage.getItem("list"));
            currListArray.forEach((item, idx) => {
                if (item.todoText == text) {
                    currListArray.splice(idx, 1);
                    localStorage.setItem("list", JSON.stringify(currListArray));                    
                }
            })
        
            todoItem.remove();    
        })

        todoItem.style.animation = "scaleDown 0.3s forwards";
    })

    todoCell.appendChild(completeBtn);
    todoCell.appendChild(trashBtn);

    todoCell.style.animation = "scaleUp 0.3s forwards";

    return todoCell;
}

function loadData() {
    let todolist = localStorage.getItem("todolist");
    if (todolist !== null) {
        let todolist = JSON.parse(todolist);
        todolist.forEach(item => {
            let todoCell = create_todo(item);
            section.appendChild(todoCell);
        })
    }
}
