import Storage from "../../services/Storage";
import TodoModel from "../Model/Todo.model";
import TodoView from "../Views/Todo.view";
export default class TodoController {
    constructor() {
        // get todo from localStorage
        this.getTodos = () => {
            const data = this.storage.getTodo("todos");
            try {
                if (JSON.parse(data)) {
                    return JSON.parse(data);
                }
                return [];
            }
            catch (error) {
                console.log(error);
                return [];
            }
        };
        this.todoView = new TodoView();
        this.todos = [];
        this.storage = new Storage();
        this.isComplete = false;
        this.currentTodo = 0;
    }
    // init todo module
    init() {
        const data = Array.from(this.getTodos());
        this.todos = data;
        this.todoView.connectEventListener(this);
        this.displayTodos(this.todos);
    }
    // display todos
    displayTodos(todos) {
        this.todoView.renderTodos(todos);
        // const baseData = Array.from(this.getTodos()) as TodoModel[];    
    }
    // add a todo
    addTodo(data) {
        if (data) {
            const currentTime = new Date();
            const id = new Date().getTime();
            const name = data;
            const createAt = currentTime;
            const updateAt = currentTime;
            const todo = new TodoModel(id, name, createAt, updateAt, false);
            this.todos.push(todo);
            try {
                this.storage.setTodo("todos", JSON.stringify(this.todos));
                this.displayTodos(this.todos);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }
        return false;
    }
    // remove todo
    removeTodo(todoId) {
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
        try {
            this.storage.setTodo('todos', JSON.stringify(this.todos));
            this.displayTodos(this.todos);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    // check a todo complete
    handleCheckComplete(todoId) {
        this.isComplete = false;
        const baseData = Array.from(this.getTodos());
        const currentItem = baseData.find(todo => todo.id == todoId);
        currentItem.complete = !currentItem.complete;
        currentItem.updateAt = new Date();
        this.todos = baseData;
        try {
            this.storage.setTodo('todos', JSON.stringify(this.todos));
            this.displayTodos(this.todos);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    // update todo list
    updateTodo(todoId, newData) {
        this.isComplete = false;
        const baseData = Array.from(this.getTodos());
        const currentItem = baseData.find(todo => todo.id == todoId);
        currentItem.name = newData;
        currentItem.updateAt = new Date();
        this.todos = baseData;
        try {
            this.storage.setTodo('todos', JSON.stringify(this.todos));
            this.displayTodos(this.todos);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
//# sourceMappingURL=Todo.controller.js.map