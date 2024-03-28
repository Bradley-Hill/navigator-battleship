"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameLoop_1 = require("../src/gameLoop");
document.addEventListener("DOMContentLoaded", function () {
    var startGameBtn = document.querySelector("#startBtn");
    var opponentBoard = document.querySelector(".opponentBoard");
    var playersBoard = document.querySelector(".playersBoard");
    var gameLoop = (0, gameLoop_1.createGameLoop)();
    if (opponentBoard instanceof HTMLElement) {
        createGrid(gameLoop.humanPlayer.gameboard, opponentBoard);
    }
    else {
        console.error("Opponent board not found");
    }
    if (playersBoard instanceof HTMLElement) {
        createGrid(gameLoop.humanPlayer.gameboard, playersBoard);
    }
    else {
        console.error("Players board not found");
    }
    if (startGameBtn) {
        startGameBtn.addEventListener("click", function () {
            gameLoop.startGame();
        });
    }
    else {
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
