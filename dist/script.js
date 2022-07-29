"use strict";
let edited;
let isEditedTodo = false;
const todosContainer = document.getElementById("mytask");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const updateBtn = document.getElementById("update-btn");
const addBtn = document.getElementById("add-btn");
class Tasks {
    constructor() {
        this.todosArray = [];
        this.loadTodos = () => {
            if (this.todosArray.length > 0) {
                const todosHtml = this.todosArray.map(({ id, date, title, description, completed }) => {
                    const difference = (new Date() - new Date(date)) / 1000 / 60 / 60 / 24;
                    let show = difference < 0 ? " Done In Time" : `Late by ${Math.floor(difference)} Days`;
                    const element = `<li class="task-item ${completed ? "completed" : ""}" id="${id}">
                <input class="checkbox-input" type="checkbox" ${completed ? "checked" : ""} data-id="${id}"/> 
                <div class="task-body">
                    <h4>${title} <span class="due-date">${completed ? show : "Due: " + date}</span></h4>
                    <p>${description}<span class="status">${completed ? " completed" : "pending"}</span></p>
                    <button class="edit-btn" style="display:${completed ? 'none' : 'inline'};" data-id="${id}">Edit<span></span></button>
                </div>
                <button class="close delete-btn" data-id="${id}">\u00D7</button>
                </li>`;
                    return element;
                });
                todosContainer.innerHTML = todosHtml.join("");
                this.addEventListeners();
            }
            else {
                todosContainer.innerHTML = "<h2 style='text-align: center;'>No Todos Yet</h2>";
            }
        };
        this.deleteTodo = (id) => {
            const updatedTodos = this.todosArray.filter(todo => todo.id !== id);
            this.todosArray = updatedTodos;
            this.loadTodos();
        };
        this.checkTodo = (id) => {
            const newTodos = this.todosArray.map(todo => {
                if (todo.id === id)
                    todo.completed = true;
                return todo;
            });
            this.todosArray = newTodos;
            this.loadTodos();
        };
        this.populateEditValues = (id) => {
            console.log(id);
            const todo = this.todosArray.filter(todo => todo.id === id);
            const found = todo.length > 0 ? todo[0] : null;
            if (found) {
                titleInput.value = found.title;
                dateInput.value = found.date;
                descriptionInput.value = found.description;
                updateBtn.style.display = "inline";
                updateBtn.setAttribute("data-id", id + "");
                addBtn.style.display = "none";
            }
        };
        this.updateTodo = (id, newTodo) => {
            const todo = this.todosArray.filter(todo => todo.id === id);
            const found = todo.length > 0 ? todo[0] : null;
            if (found) {
                newTodo.completed === found.completed;
                const newTodos = this.todosArray.map(todo => {
                    if (todo.id === id)
                        return newTodo;
                    return todo;
                });
                this.todosArray = newTodos;
                this.loadTodos();
            }
        };
        this.addEventListeners = () => {
            // Check
            const allCheckBoxes = document.querySelectorAll(".checkbox-input");
            for (const index in allCheckBoxes) {
                const checkBox = allCheckBoxes[index];
                if (checkBox instanceof HTMLInputElement) {
                    checkBox.addEventListener('change', (e) => {
                        if (e.target) {
                            const target = e.target;
                            const id = target.getAttribute("data-id");
                            if (id)
                                this.checkTodo(parseInt(id));
                        }
                    });
                }
            }
            // Delete
            const deleteBtns = document.querySelectorAll(".delete-btn");
            console.log(deleteBtns);
            for (const index in deleteBtns) {
                const deleteBtn = deleteBtns[index];
                if (deleteBtn instanceof HTMLButtonElement) {
                    deleteBtn.addEventListener('click', (e) => {
                        if (e.target) {
                            const target = e.target;
                            const id = target.getAttribute("data-id");
                            if (id)
                                this.deleteTodo(parseInt(id));
                        }
                    });
                }
            }
            // Edit
            const editBtns = document.querySelectorAll(".edit-btn");
            console.log(editBtns);
            for (const index in editBtns) {
                const editBtn = editBtns[index];
                if (editBtn instanceof HTMLButtonElement) {
                    editBtn.addEventListener('click', (e) => {
                        if (e.target) {
                            const target = e.target;
                            const id = target.getAttribute("data-id");
                            if (id)
                                this.populateEditValues(parseInt(id));
                        }
                    });
                }
            }
            //update
        };
        this.loadTodos();
    }
    addTodo(todo) {
        this.todosArray.push(todo);
        this.loadTodos();
    }
    getTodo() {
        return this.todosArray;
    }
}
const tasks = new Tasks();
const newTodoSubmit = (e) => {
    const titleValue = titleInput.value;
    const dateValue = dateInput.value;
    const descriptionValue = descriptionInput.value;
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
    const newTodo = {
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
const update = (target) => {
    const titleValue = titleInput.value;
    const dateValue = dateInput.value;
    const descriptionValue = descriptionInput.value;
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
        const id = target.getAttribute("data-id");
        if (id) {
            const updatedTodo = {
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

