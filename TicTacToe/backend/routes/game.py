from flask import Flask, Blueprint, render_template, jsonify, request
from routes.utils import helper
from ast import literal_eval

# api route for game events
gameRoute = Blueprint("/game", __name__)

# initializing game variables
game = helper.initialize_game()


# api endpoint for handling a tictactoe game move
@gameRoute.route("/move", methods=["POST"])
def game_move():
    # converts the request data from bytes to a python dictionary
    data = literal_eval(request.data.decode("utf8"))

    # checks if game has ended --> returns failure for a new move if so
    if game["status"] == "Finished":
        game["message"] = "Game has ended! Either reset board or leave!"
        return jsonify(game)
    # checks if game has tied --> returns failure for a new move if so
    elif game["status"] == "Tie":
        game["message"] = "Game has been tied! Either reset board or leave!"
        return jsonify(game)    
    # if game hasn't ended --> checks if requested cell is empty and adds marking of currentPlayer if so
    elif game["board"][data["row"]][data["col"]] == " ":
        game["board"][data["row"]][data["col"]] = game["currentPlayer"]

        # checks win conditions of the game
        # if there is a winning pattern on the board returns the game dictionary with the appropriate settings
        # checks if game is a draw and returns game dictionary with appropriate settings if so
        # if game has not been won nor has been tied, sets currentPlayer to the next player's marking and returns the appropriate settings
        if helper.checkWinCondition(game["board"]):
            game["status"] = "Finished"
            game["message"] = f"Player {game['currentPlayer']} has won!"
            return jsonify(game)
        elif helper.checkDraw(game["board"]):
            game["status"] = "Tie"
            game["message"] = "It is a tie!"
            return jsonify(game)
        else:
            game["currentPlayer"] = "O" if game["currentPlayer"] == "X" else "X"
            game["message"] = "Game Started"
            game["status"] = "In Progress"
            return jsonify(game)
    # if requested cell is not empty, then rejects the requested move and returns the game dictionary as was
    else:
        game["message"] = "This position is already filled!"
        return jsonify(game)


# api endpoint for resetting the board to play a new game
@gameRoute.route("/reset")
def reset_game():
    # resets game dictionary keys to default settings
    # returns the reset game dictionary
    game["board"] = [[" " for _ in range(3)] for _ in range(3)]
    game["currentPlayer"] = "X"
    game["status"] = ("Not Started",)
    game["message"] = "Not Started"
    return jsonify(game)
