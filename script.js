const gameBoard = (() => {
    const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                           [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    let board = ['', '', '', '', 'X', '', '', '', 'X'];

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
    const play = () => {
        console.log(gameBoard.get_board())
        let board = gameBoard.get_board()
        board[3] = 'XYO'
        console.log(gameBoard.get_board())
        console.log(board)
        gameBoard.fill()
        gameBoard.update(4, 'O')
        gameBoard.fill()
        const playerX = player('Arthur', 'X')
        const playerO = player('Brandon', 'O')
        currentPlayer = playerO;
    };
    const get_current_player_sign = () => {
        return currentPlayer.sign
    };
    return {play, get_current_player_sign}
})();

const displayController = (() => {
    const tileContainer = document.querySelector('.tile-container');
    const tileClick = event => {
        gameBoard.update(event.target.dataset.index,
                         gameController.get_current_player_sign());
        gameBoard.fill();
        console.log(gameBoard.get_board())
        if (gameBoard.is_game_over('O')) alert('WIN')
        console.log(gameBoard.get_board())
    };
    tileContainer.addEventListener('click', tileClick);
})();

gameController.play()