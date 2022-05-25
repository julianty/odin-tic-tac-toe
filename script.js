const GameBoard = (() => {
    let gameArray = [['','',''],
                    ['','',''],
                    ['','','']];
    let turn = 0;
    let Players = [];
    let liveGame = false;
    const initializePlayers = () => {
        playerOneName = document.querySelector('input[name="player-one"]').value;
        playerTwoName = document.querySelector('input[name="player-two"]').value;
        
        PlayerOne = Object.create(Player('O', playerOneName));
        PlayerTwo = Object.create(Player('X', playerTwoName));

        GameBoard.Players = [PlayerOne, PlayerTwo];
    }
    const nextPlayer = () => {
        GameBoard.turn += 1;
        text = `${GameBoard.Players[GameBoard.turn%2].name}'s turn to play`;
        DisplayController.updateAnnouncer(text);
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
               if (gameArray[i][j] == '') return false
           }
       }
       // No winners, all cells are full
       return endGame('tie')

    }
    let endGame = (winningSymbol) => {
        if (winningSymbol == 'tie') {
            DisplayController.updateAnnouncer('Game ends in a tie!')
        } else {
            DisplayController.updateAnnouncer(`${winningSymbol} wins the game!`);
        }
        resetBoard();
        GameBoard.liveGame = false;
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
        liveGame,
        initializePlayers,
        nextPlayer,
        updateGameArray,
        checkGameState,
        endGame,
        resetBoard
    };
})();

const DisplayController = (() => {
    const announcer = document.querySelector('.announcer');
    const updateAnnouncer = (text) => {
        announcer.textContent = text;
    }
    const updateDom = () => {
        console.log(GameBoard.gameArray);
    }
    const updateSquare = (square) => {
        if (GameBoard.liveGame == false) {
            updateAnnouncer('Please start the game!')
            return
        } 
        if (square.textContent != '') {
            updateAnnouncer('Please choose unoccupied square');
            return
        } 
        symbol = GameBoard.Players[GameBoard.turn % 2].symbol;
        console.log(GameBoard.turn);
        square.textContent = symbol;
        if (!GameBoard.checkGameState()) {
            GameBoard.nextPlayer();
            GameBoard.updateGameArray();
        };
    }
    return {
        updateAnnouncer,
        updateDom,
        updateSquare
    };
})()

const Player = (symbol, name) => {
    this.symbol = symbol;
    this.name = name;
    return {
        symbol,
        name
    }
}


let squareNodeList = document.querySelectorAll('.square');
squareNodeList.forEach( (node) => {
    node.addEventListener('click', e => {
        DisplayController.updateSquare(e.target);
    });
});

const startButton = document.querySelector('button.start-button')
startButton.addEventListener('click', e => {
    if (GameBoard.liveGame == false) {
        GameBoard.liveGame = true;
        GameBoard.initializePlayers();
        text = `${GameBoard.Players[GameBoard.turn%2].name}'s Turn`;
        DisplayController.updateAnnouncer(text);
    }
});


