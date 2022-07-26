let todos:any = []
const todosContainer = document.getElementById("mytask");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const addTodo = (title:string, description:string, date:number) => {
    const id = Math.ceil(Math.random() * 100000000);
    const todo = { id, title, description, date, completed: false }

    const newTodos = [...todos, todo]
    loadTodos(newTodos)

    todos.push(todo)
}
const loadTodos = (todos:any) => {
    if (todos.length > 0) {
        const todosHtml = todos.map(( id:number, date:number, title:string, description:string, completed:any ) => {
            const element = `<li class="task-item ${completed ? "completed" : ""}" id="${id}">
                <input type="checkbox" ${completed ? "checked" : ""} onchange="checkBoxChange(this)" /> 
                <div class="task-body">
                    <h4>${title} <span class="due-date">Due: ${date}</span></h4>
                    <p>${description}<span class="status">${completed ? " completed" : "pending"}</span></p>
                </div>
                <span class="close" onclick="deleteTodo(this)">\u00D7</span>
                </li>`

           return element
        })
        todosContainer.innerHTML = todosHtml.join("")
    } else {
        todosContainer.innerHTML = "<h2 style='text-align: center;'>No Todos Yet</h2>"
    }
}

class newTodoSubmit  () => {
    const titleValue = titleInput.value:String;
    const dateValue = dateInput.value;
    const descriptionValue = descriptionInput.value;

    if (!titleValue) {
        alert("Title is required")
        return
    }

//     if (!dateValue) {
//         alert("Date is required")
//         return
//     }

//     if (!descriptionValue) {
//         alert("Dscription is required")
//         return
//     }

//     addTodo(titleValue, descriptionValue, dateValue)
//     titleInput.value = ""
//     dateInput.value = ""
//     descriptionInput.value = ""
// }
loadTodos(todos)
