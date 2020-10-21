import TodoDocument from "./Todo.interface";

export default class TodoModel implements TodoDocument {
  readonly id: number;
  name: string;
  public complete: boolean;
  readonly createAt: Date;
  updateAt: Date;

  constructor(
    id: number,
    name: string,
    createAt: Date,
    updateAt: Date,
    complete: boolean
  ) {
    this.id = id;
    this.name = name;
    this.createAt = createAt;
    this.updateAt = updateAt;
    this.complete = complete!;
  }

  getTodoName(): string {
    return this.name;
  }

  setTodoName(value: string): TodoModel {
    this.name = value;
    return this;
  }

  getStatus(): boolean {
    return this.complete;
  }

  setStatus(value: boolean): TodoModel {
    this.complete = value;
    return this;
  }

  setUpdateAt(value: Date): TodoModel {
    this.updateAt = value;
    return this;
  }
}
