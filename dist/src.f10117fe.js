// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/services/Storage.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Storage = /*#__PURE__*/function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, [{
    key: "setTodo",
    value: function setTodo(key, value) {
      localStorage.setItem(key, value);
    }
  }, {
    key: "getTodo",
    value: function getTodo(key) {
      return localStorage.getItem(key);
    }
  }]);

  return Storage;
}();

exports.default = Storage;
},{}],"src/Todo/Model/Todo.model.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TodoModel = /*#__PURE__*/function () {
  function TodoModel(id, name, createAt, updateAt, complete) {
    _classCallCheck(this, TodoModel);

    this.id = id;
    this.name = name;
    this.createAt = createAt;
    this.updateAt = updateAt;
    this.complete = complete;
  }

  _createClass(TodoModel, [{
    key: "getTodoName",
    value: function getTodoName() {
      return this.name;
    }
  }, {
    key: "setTodoName",
    value: function setTodoName(value) {
      this.name = value;
      return this;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.complete;
    }
  }, {
    key: "setStatus",
    value: function setStatus(value) {
      this.complete = value;
      return this;
    }
  }, {
    key: "setUpdateAt",
    value: function setUpdateAt(value) {
      this.updateAt = value;
      return this;
    }
  }]);

  return TodoModel;
}();

exports.default = TodoModel;
},{}],"src/constants/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACTIONS = void 0;
exports.ACTIONS = {
  REMOVE: "Remove",
  ADD: "Add",
  EDIT: "Edit",
  MARK: "Mark"
};
},{}],"src/Todo/Views/Todo.view.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("../../constants/index");

var TodoView = /*#__PURE__*/function () {
  function TodoView() {
    _classCallCheck(this, TodoView);

    this.todoInput = document.querySelector("#input");
    this.todoContainer = document.querySelector(".todo-list");
    this.addNewButton = document.querySelector(".add");
  } // render all list todos to UI


  _createClass(TodoView, [{
    key: "renderTodos",
    value: function renderTodos(todos) {
      var _this = this;

      this.todoContainer.innerHTML = "";
      todos.map(function (todo) {
        var todoStatus = todo.complete ? "check" : "uncheck";
        var todoId = "data-todo-id=\"".concat(todo.id, "\"");
        var _index_1$ACTIONS = index_1.ACTIONS,
            EDIT = _index_1$ACTIONS.EDIT,
            REMOVE = _index_1$ACTIONS.REMOVE,
            MARK = _index_1$ACTIONS.MARK; //  <input data-task-id="${todo.id}" type="text" value="${todo.name}">

        var todoItem = "\n        <li class=\"todo-item\" ".concat(todoId, ">\n           <div class=\"icon\">\n             <button data-action=\"").concat(MARK, "\" ").concat(todoId, " class=\"fa btn btn-").concat(todoStatus, "\"></button>\n           </div>\n           <p class=\"todo-name ").concat(todo.complete && "checked", "\">\n             ").concat(todo.name, "\n           </p>\n           <div class=\"todo-actions\">\n             <button data-action=\"").concat(EDIT, "\" class=\"edit\" ").concat(todoId, ">Edit</button>\n             <button data-action=\"").concat(REMOVE, "\" ").concat(todoId, " class=\"delete\">Remove</button>\n           </div>\n        </li>\n      ");
        _this.todoContainer.innerHTML += "".concat(todoItem);
        return true;
      });
      return this;
    } // handle actions
    // bind event to controller

  }, {
    key: "connectEventListener",
    value: function connectEventListener(controller) {
      var _this2 = this;

      /**
       * Submit data by click add button or keydown in input field
       */
      this.addNewButton.addEventListener("click", function () {
        if (_this2.addNewButton.classList.contains('add')) {
          if (controller.addTodo(_this2.todoInput.value)) {
            _this2.todoInput.value = "";
          }
        }
      });
      this.todoInput.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
          var todoInput = e.target;

          if (controller.addTodo(todoInput.value)) {
            _this2.todoInput.value = "";
          }
        }
      });
      /**
       * action on todo item
       */

      this.todoContainer.addEventListener('click', function (e) {
        var targetNode = e.target;
        var todoID = Number(targetNode.getAttribute('data-todo-id'));
        var todoAction = targetNode.getAttribute('data-action'); // toggle status

        if (todoAction === index_1.ACTIONS.MARK) {
          controller.handleCheckComplete(todoID);
        } // delete a todo


        if (todoAction === index_1.ACTIONS.REMOVE) {
          controller.removeTodo(todoID);
        } // update a todo


        if (todoAction === index_1.ACTIONS.EDIT) {
          var data = Array.from(controller.getTodos());
          var currentTodo = data.find(function (todo) {
            return todo.id === todoID;
          });
          var prevName = currentTodo.name;
          _this2.todoInput.value = prevName;

          _this2.todoInput.focus();

          _this2.addNewButton.innerHTML = "Update";

          _this2.addNewButton.classList.remove('add');

          _this2.addNewButton.classList.add('update');

          var todoInputEditData = _this2.todoInput;

          _this2.addNewButton.addEventListener('click', function (e) {
            controller.updateTodo(todoID, todoInputEditData.value);
            _this2.todoInput.value = "";

            _this2.addNewButton.classList.remove('update');

            _this2.addNewButton.classList.add('add');

            _this2.addNewButton.innerHTML = "Add";
          });
        }
      });
    }
  }]);

  return TodoView;
}();

exports.default = TodoView;
},{"../../constants/index":"src/constants/index.ts"}],"src/Todo/Controller/Todo.controller.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Storage_1 = __importDefault(require("../../services/Storage"));

var Todo_model_1 = __importDefault(require("../Model/Todo.model"));

var Todo_view_1 = __importDefault(require("../Views/Todo.view"));

var TodoController = /*#__PURE__*/function () {
  function TodoController() {
    var _this = this;

    _classCallCheck(this, TodoController);

    // get todo from localStorage
    this.getTodos = function () {
      var data = _this.storage.getTodo("todos");

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

    this.todoView = new Todo_view_1.default();
    this.todos = [];
    this.storage = new Storage_1.default();
    this.isComplete = false;
    this.currentTodo = 0;
  } // init todo module


  _createClass(TodoController, [{
    key: "init",
    value: function init() {
      var data = Array.from(this.getTodos());
      this.todos = data;
      this.todoView.connectEventListener(this);
      this.displayTodos(this.todos);
    } // display todos

  }, {
    key: "displayTodos",
    value: function displayTodos(todos) {
      this.todoView.renderTodos(todos); // const baseData = Array.from(this.getTodos()) as TodoModel[];    
    } // add a todo

  }, {
    key: "addTodo",
    value: function addTodo(data) {
      if (data) {
        var currentTime = new Date();
        var id = new Date().getTime();
        var name = data;
        var createAt = currentTime;
        var updateAt = currentTime;
        var todo = new Todo_model_1.default(id, name, createAt, updateAt, false);
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
    } // remove todo

  }, {
    key: "removeTodo",
    value: function removeTodo(todoId) {
      this.todos = this.todos.filter(function (todo) {
        return todo.id !== todoId;
      });

      try {
        this.storage.setTodo('todos', JSON.stringify(this.todos));
        this.displayTodos(this.todos);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } // check a todo complete

  }, {
    key: "handleCheckComplete",
    value: function handleCheckComplete(todoId) {
      this.isComplete = false;
      var baseData = Array.from(this.getTodos());
      var currentItem = baseData.find(function (todo) {
        return todo.id == todoId;
      });
      currentItem.complete = !currentItem.complete;
      currentItem.updateAt = new Date();
      this.todos = baseData;

      try {
        this.storage.setTodo('todos', JSON.stringify(this.todos));
        this.displayTodos(this.todos);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } // update todo list

  }, {
    key: "updateTodo",
    value: function updateTodo(todoId, newData) {
      this.isComplete = false;
      var baseData = Array.from(this.getTodos());
      var currentItem = baseData.find(function (todo) {
        return todo.id == todoId;
      });
      currentItem.name = newData;
      currentItem.updateAt = new Date();
      this.todos = baseData;

      try {
        this.storage.setTodo('todos', JSON.stringify(this.todos));
        this.displayTodos(this.todos);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }]);

  return TodoController;
}();

exports.default = TodoController;
},{"../../services/Storage":"src/services/Storage.ts","../Model/Todo.model":"src/Todo/Model/Todo.model.ts","../Views/Todo.view":"src/Todo/Views/Todo.view.ts"}],"src/Todo/app.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Todo_controller_1 = __importDefault(require("./Controller/Todo.controller"));

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.todoController = new Todo_controller_1.default();
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      this.todoController.init();
    }
  }]);

  return App;
}();

exports.default = App;
},{"./Controller/Todo.controller":"src/Todo/Controller/Todo.controller.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var app_1 = __importDefault(require("./Todo/app"));

var app = new app_1.default();
document.addEventListener('DOMContentLoaded', function () {
  return app.init();
});
},{"./Todo/app":"src/Todo/app.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49510" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map