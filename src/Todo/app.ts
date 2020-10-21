import TodoController from "./Controller/Todo.controller";

export default class App {
  private todoController: TodoController;

  constructor() {
    this.todoController = new TodoController();
  }

  init(): void {
    this.todoController.init()
  }
}