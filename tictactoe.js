var tictactoe = {};

tictactoe.getBoard = function() {
    var i, j;
    var board = [];

    for (i = 0; i < 3; i++) {
        var col = [];
        for (j = 0; j < 3; j++) {
            col[j] = "-";
        }
        board[i] = col;
    }

    return board;
};

tictactoe.getRand = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

tictactoe.isFinished = function(board) {
    var i, j;
    var character = "X";

    for (i = 0; i < 2; i++) {
        for (j = 0; j < 3; j++) {
            if (board[j][0] === character && board[j][1] === character &&
                board[j][2] === character) {
                    return true;
            } else if (board[0][j] === character &&
                       board[1][j] === character &&
                       board[2][j] === character) {
                return true;
            }
        }

        if (board[0][0] === character && board[1][1] === character &&
            board[2][2] === character) {
                return true;
        } else if (board[0][2] === character && board[1][1] === character &&
                   board[2][0] === character) {
            return true;
        }

        character = "O";
    }

    return false;
};

tictactoe.move = function(character, board) {
    var i, j, other, rand, randCell;
    var emptyList = [];
    var isEmpty = false;
    var blank = "-";

    // Look for rows and cols with 2 marks
    for (i = 0; i < 3; i++) {
        if (board[i][0] != blank && board[i][1] != blank &&
            board[i][2] === blank) {
                board[i][2] = character;
                return;
        } else if (board[i][1] != blank && board[i][2] != blank &&
                   board[i][0] === blank) {
            board[i][0] = character;
            return;
        } else if (board[i][0] != blank && board[i][2] != blank &&
                   board[i][1] === blank) {
            board[i][1] = character;
            return;
        } else if (board[0][i] != blank &&  board[1][i] != blank &&
                   board[2][i] === blank) {
            board[2][i] = character;
            return;
        } else if (board[1][i] != blank && board[2][i] != blank &&
                   board[0][i] === blank) {
            board[0][i] = character;
            return;
        } else if (board[0][i] != blank && board[2][i] != blank &&
                   board[1][i] === blank) {
            board[1][i] = character;
            return;
        }
    }

    // Look for diagonals with 2 marks
    if (board[0][0] != blank && board[1][1] != blank &&
        board[2][2] === blank) {
            board[2][2] = character;
            return;
    } else if (board[1][1] != blank && board[2][2] != blank &&
               board[0][0] === blank) {
        board[0][0] = character;
        return;
    } else if (board[0][2] != blank && board[1][1] != blank &&
               board[2][0] === blank) {
        board[2][0] = character;
        return;
    } else if (board[2][0] != blank && board[1][1] != blank &&
               board[0][2] === blank) {
        board[0][2] = character;
        return;
    } else if ((board[0][0] != blank && board[2][2] != blank &&
                board[1][1] === blank) ||
               (board[0][2] != blank && board[2][0] != blank &&
                board[1][1] === blank)) {
        board[1][1] = character;
        return;
    }

    // Otherwise, choose a random empty cell
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (board[i][j] === "-") {
                emptyList.push([i, j]);
            }
        }
    }

    if (emptyList.length > 0) {
        rand = tictactoe.getRand(0, emptyList.length);
        randCell = emptyList[rand];
        board[randCell[0]][randCell[1]] = character;
    }
};

tictactoe.print = function(board) {
    var i, j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (j < 2) {
                document.write(board[i][j]);
                document.write("|");
            } else {
                document.writeln(board[i][j]);
            }
        }
        if (i < 2) {
            document.writeln("-----");
        }
    }
};

tictactoe.main = function() {
    var i, character;
    var board = tictactoe.getBoard();
    var chars = ["X", "O"];
    var n = tictactoe.getRand(0, 1);

    for (i = 0; i < 9; i++) {
        n = (n + 1) % chars.length;
        character = chars[n];
        tictactoe.move(character, board);
        if (tictactoe.isFinished(board)) {
            break;
        }
    }

    tictactoe.print(board);
};

tictactoe.main();
