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
})({"ship.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShip = void 0;
function createShip(size) {
  return {
    length: size,
    impacts: 0,
    sunk: false,
    position: null,
    hit: function hit() {
      this.impacts++;
    },
    isSunk: function isSunk() {
      if (this.impacts >= this.length) {
        this.sunk = true;
      }
    }
  };
}
exports.createShip = createShip;
},{}],"gameboard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGameboard = void 0;
var ship_1 = require("../src/ship");
function createGameboard(size) {
  var gameboard = {
    size: size,
    grid: Array.from({
      length: size
    }, function () {
      return Array.from({
        length: size
      }, function () {
        return {
          occupied: false,
          hit: false,
          ship: null
        };
      });
    }),
    createShips: function createShips(gameboardX, gameboardY, shipSize, orientation) {
      var ship = (0, ship_1.createShip)(shipSize);
      ship.position = [];
      for (var i = 0; i < shipSize; i++) {
        var x = gameboardX + (orientation === "horizontal" ? i : 0);
        var y = gameboardY + (orientation === "vertical" ? i : 0);
        if (x >= size || y >= size || gameboard.grid[x][y].occupied) {
          return null;
        }
        ship.position.push([x, y]);
        gameboard.grid[x][y].ship = ship;
        gameboard.grid[x][y].occupied = true;
      }
      return ship;
    },
    receiveAttack: function receiveAttack(gameboardX, gameboardY) {
      var _a;
      if (gameboard.grid[gameboardX][gameboardY].occupied) {
        gameboard.grid[gameboardX][gameboardY].hit = true;
        (_a = gameboard.grid[gameboardX][gameboardY].ship) === null || _a === void 0 ? void 0 : _a.hit();
      } else {
        gameboard.missedAttacks.push([gameboardX, gameboardY]);
      }
    },
    missedAttacks: [],
    allShipsSunk: function allShipsSunk() {
      var _a, _b;
      for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid.length; j++) {
          if (this.grid[i][j].occupied) {
            (_a = this.grid[i][j].ship) === null || _a === void 0 ? void 0 : _a.isSunk();
            if (!((_b = this.grid[i][j].ship) === null || _b === void 0 ? void 0 : _b.sunk)) {
              return false;
            } else {
              continue;
            }
          }
        }
      }
      return true;
    },
    getMissedShots: function getMissedShots() {
      return this.missedAttacks;
    },
    getHitCells: function getHitCells() {
      var hitCells = [];
      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          if (this.grid[i][j].hit) {
            hitCells.push([i, j]);
          }
        }
      }
      return hitCells;
    }
  };
  return gameboard;
}
exports.createGameboard = createGameboard;
},{"../src/ship":"ship.ts"}],"player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPlayer = void 0;
var gameboard_1 = require("../src/gameboard");
function createPlayer(isHuman) {
  return {
    isHuman: isHuman,
    gameboard: (0, gameboard_1.createGameboard)(10),
    name: isHuman ? "Player 1" : "Player 2",
    isMyTurn: isHuman,
    makeHumanMove: function makeHumanMove(x, y, opponent) {
      if (x === void 0) {
        x = 0;
      }
      if (y === void 0) {
        y = 0;
      }
      if (this.isHuman) {
        opponent.gameboard.receiveAttack(x, y);
      }
    },
    makeComputerMove: function makeComputerMove(opponent) {
      if (!this.isHuman) {
        var validMove = false;
        var x_1 = 0;
        var y_1 = 0;
        while (!validMove) {
          x_1 = Math.floor(Math.random() * opponent.gameboard.size);
          y_1 = Math.floor(Math.random() * opponent.gameboard.size);
          var missedShots = opponent.gameboard.getMissedShots();
          var hitCells = opponent.gameboard.getHitCells();
          if (!missedShots.some(function (shot) {
            return shot[0] === x_1 && shot[1] == y_1;
          }) && !hitCells.some(function (cell) {
            return cell[0] === x_1 && cell[1] === y_1;
          })) {
            validMove = true;
          }
        }
        opponent.gameboard.receiveAttack(x_1, y_1);
      }
    },
    toggleTurn: function toggleTurn() {
      this.isMyTurn = !this.isMyTurn;
    }
  };
}
exports.createPlayer = createPlayer;
},{"../src/gameboard":"gameboard.ts"}],"gameLoop.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGameLoop = void 0;
var gameboard_1 = require("../src/gameboard");
var player_1 = require("../src/player");
function createGameLoop() {
  var gameLoop = {
    humanPlayer: (0, player_1.createPlayer)(true),
    compPlayer: (0, player_1.createPlayer)(false),
    startGame: function startGame() {
      this.humanPlayer.gameboard = (0, gameboard_1.createGameboard)(10);
      this.humanPlayer.gameboard.createShips(0, 0, 1, "horizontal");
      this.humanPlayer.gameboard.createShips(0, 1, 1, "horizontal");
      this.humanPlayer.gameboard.createShips(0, 2, 1, "horizontal");
      this.compPlayer.gameboard = (0, gameboard_1.createGameboard)(10);
      this.compPlayer.gameboard.createShips(0, 0, 1, "horizontal");
      this.compPlayer.gameboard.createShips(0, 1, 1, "horizontal");
      this.compPlayer.gameboard.createShips(0, 2, 1, "horizontal");
      while (!this.gameOver) {
        this.manageTurns();
        this.checkEndOfGame();
      }
    },
    manageTurns: function manageTurns() {
      if (this.humanPlayer.isMyTurn) {
        this.humanPlayer.makeHumanMove(0, 0, /* Take co-ordinates from DOM manipulation */this.compPlayer);
      } else {
        this.compPlayer.makeComputerMove(this.humanPlayer);
      }
      this.humanPlayer.toggleTurn();
      this.compPlayer.toggleTurn();
    },
    checkEndOfGame: function checkEndOfGame() {
      if (this.compPlayer.gameboard.allShipsSunk()) {
        console.log("Congratulations! You have won!");
        this.gameOver = true;
      } else if (this.humanPlayer.gameboard.allShipsSunk()) {
        console.log("Game Over, you lost...");
        this.gameOver = true;
      }
    },
    gameOver: false
  };
  return gameLoop;
}
exports.createGameLoop = createGameLoop;
},{"../src/gameboard":"gameboard.ts","../src/player":"player.ts"}],"script.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameLoop_1 = require("../src/gameLoop");
document.addEventListener("DOMContentLoaded", function () {
  var startGameBtn = document.querySelector("#startBtn");
  var opponentBoard = document.querySelector(".opponentBoard");
  var playersBoard = document.querySelector(".playersBoard");
  if (startGameBtn) {
    startGameBtn.addEventListener("click", function () {
      var gameLoop = (0, gameLoop_1.createGameLoop)();
      gameLoop.startGame();
      if (opponentBoard instanceof HTMLElement) {
        createGrid(gameLoop.humanPlayer.gameboard, opponentBoard);
      } else {
        console.error("Opponent board not found");
      }
      if (playersBoard instanceof HTMLElement) {
        createGrid(gameLoop.humanPlayer.gameboard, playersBoard);
      } else {
        console.error("Players board not found");
      }
    });
  } else {
    console.error("Start Game button not found");
  }
  function createGrid(gameboard, htmlGrid) {
    htmlGrid.innerHTML = "";
    htmlGrid.style.gridTemplateColumns = "repeat(".concat(gameboard.size, ", 1fr)");
    htmlGrid.style.gridTemplateRows = "repeat(".concat(gameboard.size, ", 1fr)");
    var root = document.documentElement;
    root.style.setProperty("--num", gameboard.size.toString());
    for (var i = 0; i < gameboard.size; i++) {
      for (var j = 0; j < gameboard.size; j++) {
        var cell = document.createElement("div");
        cell.classList.add("cell");
        htmlGrid.appendChild(cell);
      }
    }
  }
});
},{"../src/gameLoop":"gameLoop.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43553" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.ts"], null)
//# sourceMappingURL=/script.221c08a2.js.map