const GameBoard = (() => {
    let gameArray = [['','',''],
                    ['','',''],
                    ['','','']];
    let turn = 0;
    let Players = [];
    const nextPlayer = () => {
        GameBoard.turn += 1;
    }
    const updateGameArray = () => {
        let k = 0;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                gameArray[i][j] = squareNodeList[k].textContent;
                k++;
            }
        }
    }
    const checkGameState = () => {
        
    }
    const resetBoard = () => {
        squareNodeList.forEach(square => {
            square.textContent = '';
        })
        updateGameArray();
    }
    return {
        gameArray,
        Players,
        turn,
        nextPlayer,
        updateGameArray,
        checkGameState,
        resetBoard
    };
})();

const DisplayController = (() => {
    const updateDom = () => {
        console.log(GameBoard.gameArray);
    }
    const updateSquare = (square) => {
        symbol = GameBoard.Players[GameBoard.turn % 2].symbol;
        console.log(GameBoard.turn);
        square.textContent = symbol;
        GameBoard.nextPlayer();
        GameBoard.updateGameArray();
    }
    return {
        updateDom,
        updateSquare
    };
})()

const Player = (symbol) => {
    this.symbol = symbol;
    return {
        symbol
    }
}

let PlayerOne = Object.create(Player('O'));
let PlayerTwo = Object.create(Player('X'));
GameBoard.Players.push(PlayerOne, PlayerTwo);

let squareNodeList = document.querySelectorAll('.square');
squareNodeList.forEach( (node) => {
    node.addEventListener('click', e => {
        DisplayController.updateSquare(e.target);
    });
});


