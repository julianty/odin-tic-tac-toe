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
       updateGameArray();
       // Go to each cell and check for connections
       // There are 8 ways to win
       // Middle cell has 4 ways to win
       // The other four are the straight lines that connect corners
       // For ties: no wins, all tiles are full

       // Check four ways middle cell win
       const middleSymbol = gameArray[1][1];
       if (middleSymbol != '') {
           // 1st way: diagonal connecting 00 and 22
           if (gameArray[0][0] == middleSymbol && gameArray[2][2] == middleSymbol) {
               return endGame(middleSymbol);
           }
           // 2nd way: line connecting 01 and 21
           if (gameArray[0][1] == middleSymbol && gameArray[2][1] == middleSymbol) {
               return endGame(middleSymbol);
           }
           // 3rd way: diagonal connecting 02 and 20
           if (gameArray[0][2] == middleSymbol && gameArray[2][0] == middleSymbol) {
               return endGame(middleSymbol);
           }
           // 4th way: line connecting 10 and 12
           if (gameArray[1][0] == middleSymbol && gameArray[1][2] == middleSymbol) {
               return endGame(middleSymbol);
           }
       } 

       // Check the corner connecting lines
       const topleftSymbol = gameArray[0][0];
       const bottomrightSymbol = gameArray[2][2];
       if (topleftSymbol != '') {
            // 5th way: top row
            if (gameArray[0][1] == topleftSymbol && gameArray[0][2] == topleftSymbol) {
            return endGame(topleftSymbol);
            }
            // 6th way: left column
            if (gameArray[1][0] == topleftSymbol && gameArray[2][0] == topleftSymbol) {
            return endGame(topleftSymbol);
            }
       }

       if (bottomrightSymbol != '') {
            // 7th way: bottom row
            if (gameArray[2][0] == bottomrightSymbol && gameArray[2][1] == bottomrightSymbol) {
                return endGame(bottomrightSymbol);
            }
            // 8th way: right column
            if (gameArray[1][2] == bottomrightSymbol && gameArray[0][2] == bottomrightSymbol) {
                return endGame(bottomrightSymbol);
            }
       }

       // No winners, check if all cells are full: if not, game is not over
       for (let i=0; i<3; i++) {
           for (let j=0; j<3; j++) {
               if (gameArray[i][j] == '') return
           }
       }
       // No winners, all cells are full
       return endGame('tie')

    }
    let endGame = (winningSymbol) => {
        if (winningSymbol == 'tie') {
            console.log('Game ends in a tie');
        } else {
            console.log(`${winningSymbol} wins the game`);
        }
        resetBoard();
        return winningSymbol;

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
        endGame,
        resetBoard
    };
})();

const DisplayController = (() => {
    const updateDom = () => {
        console.log(GameBoard.gameArray);
    }
    const updateSquare = (square) => {
        if (square.textContent != '') {
            console.log('Please choose unoccupied square');
            return
        } 
        symbol = GameBoard.Players[GameBoard.turn % 2].symbol;
        console.log(GameBoard.turn);
        square.textContent = symbol;
        GameBoard.checkGameState();
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


