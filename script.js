const gameBoard = (() => {
    const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                           [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    let board = ['', '', '', '', '', '', '', '', ''];

    const update = (place, sign) => {
        if (move_legal(place, sign)) {
            board[place] = sign
            return true
        }
        return false
    };

    const fill = () => {
        const container = document.querySelector('.tile-container')
        container.innerHTML = ''
        board.forEach((element, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = element;
            tile.dataset.index = index
            container.appendChild(tile)
        })
    }

    const move_legal = (place, sign) => {
        if (board[place] === '') return true;
        return false;
    };

    const get_board = () => {
        return [...board]
    };

    const is_game_over = sign => {
        for (const combo of winningCombos) {
            if (board[combo[0]] === sign && board[combo[1]] === sign && board[combo[2]] === sign) {
                return true;
            }
        }
        return false;
    }

    return {update, get_board, fill, is_game_over}
})();

const player = (name, sign) => {
    return {name, sign}
}

const gameController = (() => {
    let currentPlayer;
    let round = 1;
    let playerX;
    let playerO;

    const next_round = () => {
        if (gameBoard.is_game_over(currentPlayer.sign)) {
            alert(`${currentPlayer.name} won! (${currentPlayer.sign} sign)`)
        }
        if (round > 8) alert('TIE!')
        console.log(round)
        round++;
        if (round % 2) {
            currentPlayer = playerX
        } else {
            currentPlayer = playerO
        }
    };

    const play = (player1, player2) => {
        playerX = player(player1, 'X');
        playerO = player(player2, 'O');
        gameBoard.fill();
        currentPlayer = playerX;
    };

    const get_current_player_sign = () => {
        return currentPlayer.sign
    };

    return {play, get_current_player_sign, next_round, playerO}
})();

const displayController = (() => {
    const tileContainer = document.querySelector('.tile-container');
    const playBtn = document.querySelector('#play-btn');
    const startScreen = document.querySelector('.start');
    const tiles = document.querySelector('.tile-container')
    const player1name = document.querySelector('#player1').value;
    const player2name = document.querySelector('#player2').value;
    
    const tileClick = event => {
        gameBoard.update(event.target.dataset.index,
                         gameController.get_current_player_sign());
        gameBoard.fill();
        gameController.next_round();
        console.log(gameBoard.get_board())
    };

    const playBtnClick = event => {
        startScreen.classList.toggle('hidden');
        tiles.classList.toggle('hidden');
        gameController.play(player1name, player2name);
    };

    tileContainer.addEventListener('click', tileClick);
    playBtn.addEventListener('click', playBtnClick);
})();

gameController.play()