import { render } from "./render.js";

export let logic = {
    /** 
    * @param {string} logic.player - The actual player
    */
    initGame: (player) => {
        logic.player = player;
        render.createGame();
    },
    /** 
    * @param {string} logic.player - The actual player
    * @param {Object} event - The click event
    */
    clickBlock: (event, player) => {
        if (!isNaN(event.target.innerText)) {
            if (player == "X") {
                render.changeNextPlayer();
                logic.player = "O"
                render.makeMark(event, logic.player);
                logic.checkWinner(event.target.parentNode);
            } else {
                render.changeNextPlayer();
                logic.player = "X"
                render.makeMark(event, logic.player);
                logic.checkWinner(event.target.parentNode);
            }
        }
    },
    /** 
    * @param {node} gameDiv - The div where the game is running, default = #game
    */
    checkWinner: (gameDiv) => {
        let blocks = gameDiv.children;
        let velhaCounter = 0;
        for (let i = 0; i < 9; i++) {
            if (isNaN(blocks[i].innerText)) {
                velhaCounter++;
            }
        }
        for (let i = 0; i < 3; i++) {
            //Verfica as horizontais
            if ((blocks[(3 * i)].innerText === blocks[(3 * i) + 1].innerText) && (blocks[(3 * i)].innerText) == blocks[(3 * i) + 2].innerText) {
                render.showWinner(logic.player);
                setTimeout(function () {
                    logic.clearGame();
                }, 1500);
            }
            //Verifica as verticais
            if ((blocks[i].innerText === blocks[i + 3].innerText) && (blocks[i].innerText === blocks[i + 6].innerText)) {
                render.showWinner(logic.player);
                setTimeout(function () {
                    logic.clearGame();
                }, 1500);
            }
            //Verifica as diagonais 1
            if ((blocks[0].innerText === blocks[4].innerText) && (blocks[0].innerText == blocks[8].innerText)) {
                render.showWinner(logic.player);
                setTimeout(function () {
                    logic.clearGame();
                }, 1500);
            }
            //Verifica as diagonais 2
            if ((blocks[2].innerText === blocks[4].innerText) && (blocks[2].innerText == blocks[6].innerText)) {
                render.showWinner(logic.player);
                setTimeout(function () {
                    logic.clearGame();
                }, 1500);
            }
        }
        if (velhaCounter == 9) {
            render.showWinner(1);
            setTimeout(function () {
                logic.clearGame();
            }, 1500);

        }
    },
    clearGame: () => {
        render.clearGameRender();
    }
}

logic.initGame("X");