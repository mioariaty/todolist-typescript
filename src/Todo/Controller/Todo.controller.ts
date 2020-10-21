import Storage from "../../services/Storage";
import TodoModel from "../Model/Todo.model";
import TodoView from "../Views/Todo.view";
import { ACTIONS as actionsType } from "../../constants/index";

type GetTodo = () => TodoModel[];

export default class TodoController {
  private todoView: TodoView;
  private todos: TodoModel[];
  private storage: Storage;
  private currentTodo: number;
  private isComplete: boolean;

  constructor() {
    this.todoView = new TodoView();
    this.todos = [];
    this.storage = new Storage();
    this.isComplete = false;
    this.currentTodo = 0;
  }

  // init todo module
  init(): void {
    const data = Array.from(this.getTodos()) as TodoModel[];

    this.todos = data;
    this.todoView.connectEventListener(this)
    this.displayTodos(this.todos)
  }

  // get todo from localStorage
  getTodos: GetTodo = () => {
    const data = this.storage.getTodo("todos") as string;
    try {
      if (JSON.parse(data)) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // display todos
  displayTodos(todos: TodoModel[]): void {
    this.todoView.renderTodos(todos)
    // const baseData = Array.from(this.getTodos()) as TodoModel[];    
  }

  // add a todo
  addTodo(data: string): boolean {
    if (data) {
      const currentTime = new Date();
      const id: number = new Date().getTime();
      const name: string = data;
      const createAt = currentTime;
      const updateAt = currentTime;
      
      const todo: TodoModel = new TodoModel(
        id,
        name,
        createAt,
        updateAt,
        false
      );
      this.todos.push(todo);

      try {
        this.storage.setTodo("todos", JSON.stringify(this.todos));
        this.displayTodos(this.todos);

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    return false;
  }

  // remove todo
  removeTodo(todoId: number): boolean {
    this.todos = this.todos.filter((todo: TodoModel): boolean => todo.id !== todoId)
    
    try {
      this.storage.setTodo('todos', JSON.stringify(this.todos))
      this.displayTodos(this.todos)
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  // check a todo complete
  handleCheckComplete(todoId: number): boolean {    
    this.isComplete = false;
    const baseData = Array.from(this.getTodos()) as TodoModel[];
    const currentItem = baseData.find(todo => todo.id == todoId) as TodoModel;
    
    currentItem.complete = !currentItem.complete;
    currentItem.updateAt = new Date();
    

    this.todos = baseData;
    
    try {
      this.storage.setTodo('todos', JSON.stringify(this.todos))
      this.displayTodos(this.todos)
      return true
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // update todo list
  updateTodo(todoId: number, newData: string): boolean {
    this.isComplete = false;
    const baseData = Array.from(this.getTodos()) as TodoModel[];
    const currentItem = baseData.find(todo => todo.id == todoId) as TodoModel;

    currentItem.name = newData;
    currentItem.updateAt = new Date();

    this.todos = baseData
    try {
      this.storage.setTodo('todos', JSON.stringify(this.todos))
      this.displayTodos(this.todos)
      return true;
    } catch (error) {
      console.log(error);
      
      return false
    }
  }
}
