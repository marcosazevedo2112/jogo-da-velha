import { logic } from "./logic.js";

export let render = {
    /** 
    * @param {node} gameDiv - The div where the game is running, default = #game
    * @returns none
    */
    createGame: (gameDiv = document.querySelector("#game")) => {
        if (gameDiv == null) {
            console.error("Erro ao tentar encontrar a div com id #game");
            return -1;
        }

        for (let elementID = 0; elementID < 9; elementID++) {
            gameDiv.appendChild(render.makeBlock(elementID));
        }
    },
    
    /**
     * @param {int} index - The index of actual block
     * @returns {node} The actual node block
     */
    makeBlock: (index) => {
        let block = document.createElement("div");
        block.setAttribute("class", "block hidden");
        block.setAttribute("data-index", index)
        block.innerText = index;
        block.addEventListener("click", (e) => {
            logic.clickBlock(e, logic.player);
        });

        return block;
    },

    /** 
    * @param {string} logic.player - The actual player
    * @param {Object} event - The click event
    * @returns none
    */
    makeMark: (event, player) => {
        event.target.classList.toggle('hidden');
        event.target.innerText = player;
    },

    /** 
    * @param {node} gameDiv - The div where the game is running, default = #game
    * @returns none
    */
    clearGameRender: (gameDiv = document.querySelector("#game")) => {
        gameDiv.innerHTML = '';
        for (let elementID = 0; elementID < 9; elementID++) {
            gameDiv.appendChild(render.makeBlock(elementID));
        }
        let title = document.querySelector("#title-game");
        title.innerText = "Jogo da Velha";

    },

    /** 
    * @param {string} logic.player - The actual player
    * @returns none
    */
    showWinner: (player) => {
        let title = document.querySelector("#title-game");
        if (player !== 1) {
            setTimeout(() => {
                title.innerText = `Parabéns player ${player}, você ganhou!!`
            }), 1500
        }else{
            title.innerText = "Vish! deu velha.";
        }
        return null;
    },

    /** 
    * @param {string} logic.player - The actual player
    * @returns none
    */
    changeNextPlayer: (player) => {
        let nextPlayer = document.querySelector("#prox-player");
        nextPlayer.innerText = player;
    }
}