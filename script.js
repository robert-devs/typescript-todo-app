var edited;
var isEditedTodo = false;
var todosContainer = document.getElementById("mytask");
var titleInput = document.getElementById("title-input");
var dateInput = document.getElementById("date-input");
var descriptionInput = document.getElementById("description-input");
var updateBtn = document.getElementById("update-btn");
var addBtn = document.getElementById("add-btn");
var Tasks = /** @class */ (function () {
    function Tasks() {
        var _this = this;
        this.todosArray = [];
        this.loadTodos = function () {
            if (_this.todosArray.length > 0) {
                var todosHtml = _this.todosArray.map(function (_a) {
                    var id = _a.id, date = _a.date, title = _a.title, description = _a.description, completed = _a.completed;
                    var difference = (new Date() - new Date(date)) / 1000 / 60 / 60 / 24;
                    var show = difference < 0 ? " Done In Time" : "Late by ".concat(Math.floor(difference), " Days");
                    var element = "<li class=\"task-item ".concat(completed ? "completed" : "", "\" id=\"").concat(id, "\">\n                <input class=\"checkbox-input\" type=\"checkbox\" ").concat(completed ? "checked" : "", " data-id=\"").concat(id, "\"/> \n                <div class=\"task-body\">\n                    <h4>").concat(title, " <span class=\"due-date\">").concat(completed ? show : "Due: " + date, "</span></h4>\n                    <p>").concat(description, "<span class=\"status\">").concat(completed ? " completed" : "pending", "</span></p>\n                    <button class=\"edit-btn\" style=\"display:").concat(completed ? 'none' : 'inline', ";\" data-id=\"").concat(id, "\">Edit<span></span></button>\n                </div>\n                <button class=\"close delete-btn\" data-id=\"").concat(id, "\">\u00D7</button>\n                </li>");
                    return element;
                });
                todosContainer.innerHTML = todosHtml.join("");
                _this.addEventListeners();
            }
            else {
                todosContainer.innerHTML = "<h2 style='text-align: center;'>No Todos Yet</h2>";
            }
        };
        this.deleteTodo = function (id) {
            var updatedTodos = _this.todosArray.filter(function (todo) { return todo.id !== id; });
            _this.todosArray = updatedTodos;
            _this.loadTodos();
        };
        this.checkTodo = function (id) {
            var newTodos = _this.todosArray.map(function (todo) {
                if (todo.id === id)
                    todo.completed = true;
                return todo;
            });
            _this.todosArray = newTodos;
            _this.loadTodos();
        };
        this.populateEditValues = function (id) {
            console.log(id);
            var todo = _this.todosArray.filter(function (todo) { return todo.id === id; });
            var found = todo.length > 0 ? todo[0] : null;
            if (found) {
                titleInput.value = found.title;
                dateInput.value = found.date;
                descriptionInput.value = found.description;
                updateBtn.style.display = "inline";
                updateBtn.setAttribute("data-id", id + "");
                addBtn.style.display = "none";
            }
        };
        this.updateTodo = function (id, newTodo) {
            var todo = _this.todosArray.filter(function (todo) { return todo.id === id; });
            var found = todo.length > 0 ? todo[0] : null;
            if (found) {
                newTodo.completed === found.completed;
                var newTodos = _this.todosArray.map(function (todo) {
                    if (todo.id === id)
                        return newTodo;
                    return todo;
                });
                _this.todosArray = newTodos;
                _this.loadTodos();
            }
        };
        this.addEventListeners = function () {
            // Check
            var allCheckBoxes = document.querySelectorAll(".checkbox-input");
            for (var index in allCheckBoxes) {
                var checkBox = allCheckBoxes[index];
                if (checkBox instanceof HTMLInputElement) {
                    checkBox.addEventListener('change', function (e) {
                        if (e.target) {
                            var target = e.target;
                            var id = target.getAttribute("data-id");
                            if (id)
                                _this.checkTodo(parseInt(id));
                        }
                    });
                }
            }
            // Delete
            var deleteBtns = document.querySelectorAll(".delete-btn");
            console.log(deleteBtns);
            for (var index in deleteBtns) {
                var deleteBtn = deleteBtns[index];
                if (deleteBtn instanceof HTMLButtonElement) {
                    deleteBtn.addEventListener('click', function (e) {
                        if (e.target) {
                            var target = e.target;
                            var id = target.getAttribute("data-id");
                            if (id)
                                _this.deleteTodo(parseInt(id));
                        }
                    });
                }
            }
            // Edit
            var editBtns = document.querySelectorAll(".edit-btn");
            console.log(editBtns);
            for (var index in editBtns) {
                var editBtn = editBtns[index];
                if (editBtn instanceof HTMLButtonElement) {
                    editBtn.addEventListener('click', function (e) {
                        if (e.target) {
                            var target = e.target;
                            var id = target.getAttribute("data-id");
                            if (id)
                                _this.populateEditValues(parseInt(id));
                        }
                    });
                }
            }
            //update
        };
        this.loadTodos();
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
var update = function (target) {
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
    console.log(target);
    if (target) {
        var id = target.getAttribute("data-id");
        if (id) {
            var updatedTodo = {
                title: titleValue,
                description: descriptionValue,
                date: dateValue,
                id: parseInt(id)
            };
            tasks.updateTodo(parseInt(id), updatedTodo);
            titleInput.value = "";
            dateInput.value = "";
            descriptionInput.value = "";
            updateBtn.style.display = "none";
            updateBtn.removeAttribute("data-id");
            addBtn.style.display = "inline";
        }
    }
};
// const checkBoxChange = (e: any) => {
// const todoId = e.parentElement.id
//     const updatedTodos = todos.map((todo: { id: number; completed: true; }) => {
//         // console.log(todo.id, todoId);
//         if (todo.id === parseInt(todoId)) todo.completed = e.checked
//         return todo
//     })
//     loadTodos(updatedTodos)
//     todos = updatedTodos
// }
