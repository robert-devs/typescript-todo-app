let edited: string
let isEditedTodo: boolean = false;

const todosContainer = document.getElementById("mytask");
const titleInput = document.getElementById("title-input") as HTMLInputElement;
const dateInput = document.getElementById("date-input") as HTMLInputElement;
const descriptionInput = document.getElementById("description-input") as HTMLInputElement;

interface Todo {
    title: any
    description: any
    date: string
    id: number
    completed: boolean;

}
class Tasks {

    private todosArray: Todo[] = []
    constructor
        () { }
    addTodo(todo: Todo) {
        
        this.todosArray.push(todo)
        this.loadTodos()
    }
    getTodo() {
        return this.todosArray;
    }

    loadTodos = () => {
    if (this.todosArray.length > 0) {
        const todosHtml = this.todosArray.map(({ id, date, title, description, completed }) => {
            const element: any = `<li class="task-item ${completed ? "completed" : ""}" id="${id}">
                <input type="checkbox" ${completed ? "checked" : ""} onchange="checkBoxChange(this)" /> 
                <div class="task-body">
                    <h4>${title} <span class="due-date">Due: ${date}</span></h4>
                    <p>${description}<span class="status">${completed ? " completed" : "pending"}</span></p>
                    <p>${description}<span class="">${completed ? " completed" : "pending"}</span></p>
                </div>
                <span class="close" onclick="deleteTodo(this)">\u00D7</span>
                </li>`

            return element
        })
        todosContainer!.innerHTML = todosHtml.join("")
    } else {
        todosContainer!.innerHTML = "<h2 style='text-align: center;'>No Todos Yet</h2>"
    }
}

deleteTodo = (id: number) => {
    // console.log(e);
    const updatedTodos = this.todosArray.filter((todo: { id: number; }) => todo.id !== id)

    this.todosArray = updatedTodos
    this.loadTodos()
}
 editTodo = (todoId: Number,) =>{
    console.log(todoId,)
    const editId = todoId;
    const isEditedTodo = true;

}
 checkBoxChange = (e:any) => {
    const todoId = e.parentElement.id

    const updatedTodos = this.todosArray.map(todo => {
        // console.log(todo.id, todoId);
        if (todo.id === parseInt(todoId)) todo.completed = e.checked
        return todo
    })
    this.todosArray =updatedTodos
    this.todosArray = updatedTodos
}

}

const tasks = new Tasks()

const newTodoSubmit = (e: any) => {
    const titleValue = titleInput.value;
    const dateValue = dateInput.value;
    const descriptionValue = descriptionInput.value;



    if (!titleValue) {
        alert("Title is required")
        return
    }

    if (!dateValue) {
        alert("Date is required")
        return
    }

    if (!descriptionValue) {
        alert("Dscription is required")
        return
    }

    const newTodo:Todo = {
        title: titleValue,
        description: descriptionValue,
        date: dateValue,
        completed: false,
        id: Math.floor(Math.random() * 10000000)
    }

    tasks.addTodo(newTodo)

    titleInput.value = ""
    dateInput.value = ""
    descriptionInput.value = ""


}

// const checkBoxChange = (e: any) => {
//     const todoId = e.parentElement.id

//     const updatedTodos = todos.map((todo: { id: number; completed: true; }) => {
//         // console.log(todo.id, todoId);
//         if (todo.id === parseInt(todoId)) todo.completed = e.checked
//         return todo
//     })
//     loadTodos(updatedTodos)
//     todos = updatedTodos
// }




