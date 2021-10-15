import { render } from "./render.js";

export let logic = {
    /** 
    * @param {string} logic.player - The actual player, can be 'X' or 'O'
    * @returns none
    */
    initGame: (player) => {
        logic.canPlay = true;
        logic.player = player;
        render.createGame();
        render.changeNextPlayer(logic.player);
    },

    /** 
    * @param {string} logic.player - The actual player
    * @param {Object} event - The click event
    * @returns none
    */
    clickBlock: (event, player) => {
        if (!isNaN(event.target.innerText) && logic.canPlay) {
            if (player === "X") {
                render.makeMark(event, logic.player);
                logic.checkWinner(event.target.parentNode);
                logic.player = "O"
                render.changeNextPlayer(logic.player);
            } else {
                render.makeMark(event, logic.player);
                logic.checkWinner(event.target.parentNode);
                logic.player = "X"
                render.changeNextPlayer(logic.player);
            }
        }
    },

    /** 
    * @param {node} gameDiv - The div where the game is running, default = #game
    * @returns none
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
            //Verifica as horizontais
            if ((blocks[(3 * i)].innerText === blocks[(3 * i) + 1].innerText) && (blocks[(3 * i)].innerText) == blocks[(3 * i) + 2].innerText && logic.canPlay) {
                logic.win([3*i, (3*i)+1, (3*i)+2], logic.player);
            }
            //Verifica as verticais
            else if ((blocks[i].innerText === blocks[i + 3].innerText) && (blocks[i].innerText === blocks[i + 6].innerText) && logic.canPlay) {
                logic.win([i, i+3, i+6], logic.player)
            }
            //Verifica as diagonais 1
            else if ((blocks[0].innerText === blocks[4].innerText) && (blocks[0].innerText == blocks[8].innerText) && logic.canPlay) {
                logic.win([0, 4, 8], logic.player);
            }
            //Verifica as diagonais 2
            else if ((blocks[2].innerText === blocks[4].innerText) && (blocks[2].innerText == blocks[6].innerText) && logic.canPlay) {
                logic.win([2, 4, 6], logic.player);
            }
        }
        if (velhaCounter == 9 && logic.canPlay) {
            logic.win([0, 1, 2, 3, 4, 5, 6, 7, 8], undefined)
        }
    },
    
    /**
    * @param {array} blocks - The id of blocks to paint in a winning case
    * @param {string | undefined} logic.player - If the someone wins, the player who wins, if not, undefined
    * @returns none
    */
    win: (blocks, player)=>{
        logic.canPlay = false;
        render.paintWinner(blocks);
        render.showWinner(player);
        setTimeout(function () {
            logic.clearGame();
            logic.canPlay = true;
        }, 1500);
    },

    /**
     * @returns none
     */
    clearGame: () => {
        render.clearGameRender();
    }
}