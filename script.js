const gameBoard = (() => {
    const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                           [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let board = ['', '', '', '', '', '', '', '', ''];

    const update = (place, sign) => {
        if (is_move_legal(place)) {
            board[place] = sign;
            return true;
        }
        return false;
    };

    const is_move_legal = (place) => {
        if (board[place] === '') return true;
        return false;
    };

    const get_board = () => {
        return [...board];
    };

    const is_game_over = sign => {
        for (const combo of winningCombos) {
            if (board[combo[0]] === sign && board[combo[1]] === sign && board[combo[2]] === sign) {
                return true;
            }
        }
        return false;
    };

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    return {update, get_board, is_game_over, reset};
})();

const playerFactory = (name, sign) => {
    return {name, sign};
};

const gameController = (() => {
    let currentPlayer;
    let round = 1;
    let playerX;
    let playerO;

    const next_round = () => {
        if (gameBoard.is_game_over(currentPlayer.sign)) {
            end_game(true);
            return;
        }
        if (round > 8) end_game(false);
        round++;
        if (round % 2) {
            currentPlayer = playerX;
        } else {
            currentPlayer = playerO;
        }
        displayController.changeCurrentPlayer();
    };

    const play = (player1, player2) => {
        playerX = playerFactory(player1, 'X');
        playerO = playerFactory(player2, 'O');
        currentPlayer = playerX;
        round = 1;
        gameBoard.reset();
        displayController.fillBoard();
        displayController.changeCurrentPlayer();
    };

    const get_current_player_sign = () => {
        return currentPlayer.sign;
    };

    const get_current_player_name = () => {
        return currentPlayer.name;
    };

    const end_game = win => {
        displayController.showResults(win);
    };

    return {play, get_current_player_sign, next_round, get_current_player_name};
})();

const displayController = (() => {
    const tileContainer = document.querySelector('.tile-container');
    const playBtn = document.querySelector('#play-btn');
    const resetBtn = document.querySelector('#reset-btn');
    const startElements = document.querySelectorAll('.start');
    const tiles = document.querySelector('.tile-container');
    const game_info = document.querySelector('#game-info');
    const info_text = document.querySelector('.info');

    
    const tileClick = event => {
        if (gameBoard.update(event.target.dataset.index, gameController.get_current_player_sign())) {
            fillBoard();
            gameController.next_round();
        }
    };

    const playBtnClick = event => {
        const player1name = document.querySelector('#player1').value;
        const player2name = document.querySelector('#player2').value;
        startElements.forEach(element => element.classList.add('hidden'));
        tiles.classList.remove('hidden');
        game_info.classList.remove('hidden');
        gameController.play(player1name, player2name);
        tileContainer.classList.remove('disabled');
        info_text.textContent = 'Now it\'s your turn';
    };

    const fillBoard = () => {
        const board = gameBoard.get_board();
        const container = document.querySelector('.tile-container');
        container.innerHTML = '';
        board.forEach((element, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = element;
            tile.dataset.index = index;
            container.appendChild(tile);
        });
    };

    const changeCurrentPlayer = () => {
        const player_name = gameController.get_current_player_name();
        const player_sign = gameController.get_current_player_sign();
        document.querySelector('.player-name').textContent = `${player_name} (${player_sign})`;
    };

    const showResults = (win) => {
        let result_text = 'It\'s a tie! Maybe one more game?';
        if (win) {
            result_text = 'You win! Congratulations! Wanna play again?';
        }
        info_text.textContent = result_text;
        tileContainer.classList.add('disabled');
    };

    tileContainer.addEventListener('click', tileClick);
    playBtn.addEventListener('click', playBtnClick);
    resetBtn.addEventListener('click', playBtnClick);
    document.querySelector('#reload').addEventListener('click', () => window.location.reload());

    return {changeCurrentPlayer, showResults, fillBoard};
})();
