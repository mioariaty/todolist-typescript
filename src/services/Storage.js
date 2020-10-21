export default class Storage {
    setTodo(key, value) {
        localStorage.setItem(key, value);
    }
    getTodo(key) {
        return localStorage.getItem(key);
    }
}
//# sourceMappingURL=Storage.js.map