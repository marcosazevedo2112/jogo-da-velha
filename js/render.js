import { logic } from "./logic.js";

export let render = {
    createGame: (gridSize = 3, gameDiv = document.querySelector("#game")) => {
        if (gameDiv == null) {
            console.error("Erro ao tentar encontrar a div com id #game");
            return -1;
        }

        for (let elementID = 0; elementID < gridSize * gridSize; elementID++) {
            gameDiv.appendChild(render.makeBlock(elementID));
        }
    },
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
    makeMark: (event, player) => {
        event.target.classList.toggle('hidden');
        event.target.innerText = player;
    },
    clearGameRender: (gridSize = 3, gameDiv = document.querySelector("#game")) => {
        gameDiv.innerHTML = '';
        for (let elementID = 0; elementID < gridSize * gridSize; elementID++) {
            gameDiv.appendChild(render.makeBlock(elementID));
        }
        let title = document.querySelector("#title-game");
        title.innerText = "Jogo da Velha";

    },
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
    changeNextPlayer: () => {
        let nextPlayer = document.querySelector("#prox-player");
        nextPlayer.innerText = logic.player;
    }
}