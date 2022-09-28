const gameBoard = (() => {
    let board = ['', '', '', '', 'X', '', '', '', 'X']
    const update = (place, sign) => {
        if (move_legal(place, sign)) {
            board[place] = sign
            return true
        }
        return false
    }
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
        return true;
    }
    const get_board = () => {
        return [...board]
    }
    return {update, get_board, fill}
})();

const gameController = (() => {
    console.log(gameBoard.get_board())
    let board = gameBoard.get_board()
    board[3] = 'XYO'
    console.log(gameBoard.get_board())
    console.log(board)
    gameBoard.fill()
    gameBoard.update(4, 'O')
    gameBoard.fill()
})();