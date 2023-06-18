let section = document.querySelector("section");
let add = document.querySelector("form button");
let sort = document.querySelector("div.sort button");

load_data();

add.addEventListener("click", e => {

    e.preventDefault();

    let form = e.target.parentElement;

    let newTodo = {
        todoText: form.children[0].value,
        todoDate: form.children[1].value,
        todoMonth: form.children[2].value
    };
    
    if (input_check(newTodo) == false) {
        return;
    }

    let todoCell = create_todo(newTodo);

    let todoList = localStorage.getItem("todolist");

    if (todoList == null) {
        localStorage.setItem("todolist", JSON.stringify([newTodo]));
    } else {
        let newTodoList = JSON.parse(todoList);
        newTodoList.push(newTodo);
        localStorage.setItem("todolist", JSON.stringify(newTodoList));
    }

    section.appendChild(todoCell);
})

sort.addEventListener("click", e => {
    let todoListArray = JSON.parse(localStorage.getItem("todolist"));

    sortedArray = mergeSort(todoListArray);

    localStorage.setItem("todolist", JSON.stringify(sortedArray));

    let len = section.children.length;
    for (let i = 0; i < len; i++) {
        section.children[0].remove();
    }

    load_data();
})

function input_check(item) {
    if (item.todoText === "" || item.todoMonth === "" || item.todoDate === "") {
        alert("Missing value");
        return false;
    }

    let m = Number(item.todoMonth);
    let d = Number(item.todoDate);

    switch (m) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 11:
            if (d < 1 || d > 31) {
                alert("Invalid Date Input");
                return false;    
            }
            break;
        case 4:
        case 6:
        case 9:
        case 12:
            if (d < 1 || d > 30) {
                alert("Invalid Date Input");
                return false;    
            }
            break;
        case 2:
            if (d < 1 || d > 29) {
                alert("Invalid Date Input");
                return false;      
            }
            break;
        default:
            alert("Invalid Month Input");
            return false;  
    }

    return true;
}


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
    completeBtn.title = "Completed";
    completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    completeBtn.addEventListener("click", e => {
        todoCell.classList.toggle("done");
    })

    let trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.title = "Remove item";
    trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;

        todoItem.addEventListener("animationend", () => {
            let text = todoItem.children[0].innerText;
            let todoListArray = JSON.parse(localStorage.getItem("todolist"));
            todoListArray.forEach((item, idx) => {
                if (item.todoText == text) {
                    todoListArray.splice(idx, 1);
                    localStorage.setItem("todolist", JSON.stringify(todoListArray));                    
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

function load_data() {
    let todoList = localStorage.getItem("todolist");
    if (todoList !== null) {
        let todoListArray = JSON.parse(todoList);
        todoListArray.forEach(item => {
            let todoCell = create_todo(item);
            section.appendChild(todoCell);
        })
    }
}


function mergeStep(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
            result.push(arr2[j]);
            j++;
        } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
            result.push(arr1[i]);
            i++;
        } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
            if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
                result.push(arr2[j]);
                j++;
            } else {
                result.push(arr1[i]);
                i++;
            }
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        ++i;
    }

    while (j < arr2.length) {
        result.push(arr2[j]);
        ++j;
    }

    return result;
}

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    } else {
        let mid = Math.floor(arr.length / 2);
        let right = arr.slice(0, mid);
        let left = arr.slice(mid, arr.length);
        return mergeStep(mergeSort(right), mergeSort(left));
    }
}
