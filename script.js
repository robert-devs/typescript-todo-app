var edited;
var isEditedTodo = false;
var todosContainer = document.getElementById("mytask");
var titleInput = document.getElementById("title-input");
var dateInput = document.getElementById("date-input");
var descriptionInput = document.getElementById("description-input");
var Tasks = /** @class */ (function () {
    function Tasks() {
        var _this = this;
        this.todosArray = [];
        this.loadTodos = function () {
            if (_this.todosArray.length > 0) {
                var todosHtml = _this.todosArray.map(function (_a) {
                    var id = _a.id, date = _a.date, title = _a.title, description = _a.description, completed = _a.completed;
                    var element = "<li class=\"task-item ".concat(completed ? "completed" : "", "\" id=\"").concat(id, "\">\n                <input type=\"checkbox\" ").concat(completed ? "checked" : "", " onchange=\"checkBoxChange(this)\" /> \n                <div class=\"task-body\">\n                    <h4>").concat(title, " <span class=\"due-date\">Due: ").concat(date, "</span></h4>\n                    <p>").concat(description, "<span class=\"status\">").concat(completed ? " completed" : "pending", "</span></p>\n                </div>\n                <span class=\"edit\" onclick=\"editTodo(this)>edit</span>\n                <span class=\"close\" onclick=\"deleteTodo(this)\">\u00D7</span>\n                </li>");
                    return element;
                });
                todosContainer.innerHTML = todosHtml.join("");
            }
            else {
                todosContainer.innerHTML = "<h2 style='text-align: center;'>No Todos Yet</h2>";
            }
        };
        this.deleteTodo = function (id) {
            // console.log(e);
            var updatedTodos = _this.todosArray.filter(function (todo) { return todo.id !== id; });
            _this.todosArray = updatedTodos;
            _this.loadTodos();
        };
        this.editTodo = function (todoId) {
            console.log(todoId);
            var editId = todoId;
            var isEditedTodo = true;
        };
    }
    Tasks.prototype.addTodo = function (todo) {
        this.todosArray.push(todo);
        this.loadTodos();
    };
    Tasks.prototype.getTodo = function () {
        return this.todosArray;
    };
    return Tasks;
}());
var tasks = new Tasks();
var newTodoSubmit = function (e) {
    var titleValue = titleInput.value;
    var dateValue = dateInput.value;
    var descriptionValue = descriptionInput.value;
    if (!titleValue) {
        alert("Title is required");
        return;
    }
    if (!dateValue) {
        alert("Date is required");
        return;
    }
    if (!descriptionValue) {
        alert("Dscription is required");
        return;
    }
    var newTodo = {
        title: titleValue,
        description: descriptionValue,
        date: dateValue,
        completed: false,
        id: Math.floor(Math.random() * 10000000)
    };
    tasks.addTodo(newTodo);
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
};
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
