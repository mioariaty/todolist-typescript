export default class TodoModel {
    constructor(id, name, createAt, updateAt, complete) {
        this.id = id;
        this.name = name;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.complete = complete;
    }
    getTodoName() {
        return this.name;
    }
    setTodoName(value) {
        this.name = value;
        return this;
    }
    getStatus() {
        return this.complete;
    }
    setStatus(value) {
        this.complete = value;
        return this;
    }
    setUpdateAt(value) {
        this.updateAt = value;
        return this;
    }
}
//# sourceMappingURL=Todo.model.js.map