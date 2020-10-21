import {
  ACTIONS as actionType
} from "../../constants/index";
import TodoController from "../Controller/Todo.controller";
import TodoModel from "../Model/Todo.model";

export default class TodoView {
  private todoInput;
  private todoContainer;
  private addNewButton;

  constructor() {
    this.todoInput = document.querySelector("#input") as HTMLInputElement;
    this.todoContainer = document.querySelector(".todo-list") as HTMLUListElement;
    this.addNewButton = document.querySelector(".add") as HTMLButtonElement;
  }

  // render all list todos to UI
  renderTodos(todos: TodoModel[]): TodoView {
    this.todoContainer.innerHTML = "";

    todos.map((todo: TodoModel) => {
      const todoStatus = todo.complete ? "check" : "uncheck";
      const todoId = `data-todo-id="${todo.id}"`;
      const { EDIT, REMOVE, MARK } = actionType;
      
      //  <input data-task-id="${todo.id}" type="text" value="${todo.name}">
      
      const todoItem = `
        <li class="todo-item" ${todoId}>
           <div class="icon">
             <button data-action="${MARK}" ${todoId} class="fa btn btn-${todoStatus}"></button>
           </div>
           <p class="todo-name ${todo.complete && "checked"}">
             ${todo.name}
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
  connectEventListener(controller: TodoController): void {
    /**
     * Submit data by click add button or keydown in input field
     */
    this.addNewButton.addEventListener("click", (): void => {
      if (this.addNewButton.classList.contains('add')) { 
        if (controller.addTodo(this.todoInput.value)) {
          this.todoInput.value = "";
        } 
      }
    });

    this.todoInput.addEventListener('keypress', (e: KeyboardEvent): void => {
      if (e.keyCode === 13) {
        const todoInput = e.target as HTMLInputElement;
        if (controller.addTodo(todoInput.value)) {
          this.todoInput.value = ""
        }
      }
    })

    /**
     * action on todo item
     */
    this.todoContainer.addEventListener('click', (e) => {
      const targetNode = e.target as HTMLElement;
      const todoID =  Number(targetNode.getAttribute('data-todo-id'));
      const todoAction = targetNode.getAttribute('data-action');
            
      // toggle status
      if (todoAction === actionType.MARK) {
        controller.handleCheckComplete(todoID)
      }

      // delete a todo
      if (todoAction === actionType.REMOVE) {
        controller.removeTodo(todoID)
      }

      // update a todo
      if (todoAction === actionType.EDIT) {
        const data = Array.from(controller.getTodos()) as TodoModel[];
        const currentTodo = data.find(todo => todo.id === todoID) as TodoModel;
        const prevName = currentTodo.name;

        this.todoInput.value = prevName;
        this.todoInput.focus()
        this.addNewButton.innerHTML = "Update"
        this.addNewButton.classList.remove('add')
        this.addNewButton.classList.add('update')
        const todoInputEditData = this.todoInput as HTMLInputElement;
        
          
        this.addNewButton.addEventListener('click', e => {
          controller.updateTodo(todoID, todoInputEditData.value)
          
          this.todoInput.value = "";
          this.addNewButton.classList.remove('update')
          this.addNewButton.classList.add('add')
          this.addNewButton.innerHTML = "Add"
        })
      }
    })
  }
}