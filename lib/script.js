"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameLoop_1 = require("../src/gameLoop");
document.addEventListener("DOMContentLoaded", function () {
    var startGameBtn = document.querySelector("#startBtn");
    // const opponentBoard = document.querySelector(".opponentBoard");
    // const playersBoard = document.querySelector(".playersBoard");
    if (startGameBtn) {
        startGameBtn.addEventListener("click", function () {
            var gameLoop = (0, gameLoop_1.createGameLoop)();
            gameLoop.startGame();
        });
    }
    else {
        console.error("Start Game button not found");
    }
});
