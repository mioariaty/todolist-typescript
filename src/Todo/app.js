import TodoController from "./Controller/Todo.controller";
export default class App {
    constructor() {
        this.todoController = new TodoController();
    }
    init() {
        this.todoController.init();
    }
}
//# sourceMappingURL=app.js.map