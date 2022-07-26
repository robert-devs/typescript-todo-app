var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var todos = [];
var todosContainer = document.getElementById("mytask");
var titleInput = document.getElementById("title-input");
var dateInput = document.getElementById("date-input");
var descriptionInput = document.getElementById("description-input");
var addTodo = function (title, description, date) {
    var id = Math.ceil(Math.random() * 100000000);
    var todo = { id: id, title: title, description: description, date: date, completed: false };
    var newTodos = __spreadArray(__spreadArray([], todos, true), [todo], false);
    loadTodos(newTodos);
    todos.push(todo);
};
var loadTodos = function (todos) {
    if (todos.length > 0) {
        var todosHtml = todos.map(function (id, date, title, description, completed) {
            var element = "<li class=\"task-item ".concat(completed ? "completed" : "", "\" id=\"").concat(id, "\">\n                <input type=\"checkbox\" ").concat(completed ? "checked" : "", " onchange=\"checkBoxChange(this)\" /> \n                <div class=\"task-body\">\n                    <h4>").concat(title, " <span class=\"due-date\">Due: ").concat(date, "</span></h4>\n                    <p>").concat(description, "<span class=\"status\">").concat(completed ? " completed" : "pending", "</span></p>\n                </div>\n                <span class=\"close\" onclick=\"deleteTodo(this)\">\u00D7</span>\n                </li>");
            return element;
        });
        todosContainer.innerHTML = todosHtml.join("");
    }
    else {
        todosContainer.innerHTML = "<h2 style='text-align: center;'>No Todos Yet</h2>";
    }
};
