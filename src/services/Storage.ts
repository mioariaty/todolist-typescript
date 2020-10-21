export default class Storage {
  setTodo(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getTodo(key: string) {
    return localStorage.getItem(key);
  }
}
