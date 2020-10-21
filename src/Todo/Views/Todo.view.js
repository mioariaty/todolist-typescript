import { ACTIONS as actionType } from "../../constants/index";
export default class TodoView {
    constructor() {
        this.todoInput = document.querySelector("#input");
        this.todoContainer = document.querySelector(".todo-list");
        this.addNewButton = document.querySelector(".add");
    }
    // render all list todos to UI
    renderTodos(todos) {
        this.todoContainer.innerHTML = "";
        todos.map((todo) => {
            const todoStatus = todo.complete ? "check" : "uncheck";
            const todoId = `data-todo-id="${todo.id}"`;
            const { EDIT, REMOVE, MARK } = actionType;
            const todoItem = `
        <li class="todo-item" ${todoId}>
           <div class="icon">
             <button data-action="${MARK}" ${todoId} class="fa btn btn-${todoStatus}"></button>
           </div>
           <p class="todo-name ${todo.complete && "checked"}">
             ${todo.name}
             <input data-task-id="${todo.id}" type="text" value="${todo.name}">
           </p>
           <div class="todo-actions">
             <button data-action="${EDIT}" class="edit" ${todoId}>Edit</button>
             <button data-action="${REMOVE}" ${todoId} class="delete">Remove</button>
           </div>
        </li>
      `;
            this.todoContainer.innerHTML += `${todoItem}`;
            return true;
        });
        return this;
    }
    // handle actions
    // bind event to controller
    connectEventListener(controller) {
        /**
         * Submit data by click add button or keydown in input field
         */
        this.addNewButton.addEventListener("click", () => {
            if (controller.addTodo(this.todoInput.value)) {
                this.todoInput.value = "";
            }
        });
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                const todoInput = e.target;
                if (controller.addTodo(todoInput.value)) {
                    this.todoInput.value = "";
                }
            }
        });
        /**
         * action on todo item
         */
        this.todoContainer.addEventListener('click', (e) => {
            const targetNode = e.target;
            const todoID = Number(targetNode.getAttribute('data-todo-id'));
            const todoAction = targetNode.getAttribute('data-action');
            const todoInputEdit = document.querySelector(`input[data-task-id="${todoID}"]`);
            // toggle status
            if (todoAction === actionType.MARK) {
                controller.handleCheckComplete(todoID);
            }
            // delete a todo
            if (todoAction === actionType.REMOVE) {
                controller.removeTodo(todoID);
            }
            // update a todo
            if (todoAction === actionType.EDIT) {
                todoInputEdit.classList.add('edit-input');
                todoInputEdit.focus();
            }
        });
    }
}
//# sourceMappingURL=Todo.view.js.map