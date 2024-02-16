# helper file to initialize game board and check for win cons

from itertools import chain

# initializes a new game dictionary
def initialize_game():
    game = {
        "board": [[" " for _ in range(3)] for _ in range(3)],
        "currentPlayer": "X",
        "status": "Not Started",
        "message": "Not Started"
    }

    return game

# checks the given game board for a winning pattern
def checkWinCondition(board):
    # flattens the 2D array into a 1D array
    flattenedBoard = list(chain.from_iterable(board))
    # destrutuctures each array index into named indices
    [nw, n, ne, w, c, e, sw, s, se] = flattenedBoard
    return (
        # checks if any winning pattern exists on the board by having a hardcoded list of winning patterns
        checkValues(nw, n, ne)
        or checkValues(w, c, e)
        or checkValues(sw, s, se)
        or checkValues(nw, w, sw)
        or checkValues(n, c, s)
        or checkValues(ne, e, se)
        or checkValues(nw, c, se)
        or checkValues(ne, c, sw)
    )

# checks if the game is a tie
def checkDraw(board):
    # flattens the 2D array into a 1D array
    flattenedBoard = list(chain.from_iterable(board))
    # checks whether the game has not been won and whether all the cells have been filled 
    return not (checkWinCondition(flattenedBoard)) and all(
        cell != " " for row in board for cell in row
    )

# checks values of three parameters and returns true if they are equal AND not empty
def checkValues(a,b,c):
    if (a == ' ' or b == ' ' or c ==  ' '):
        return False
    return a == b and b == c