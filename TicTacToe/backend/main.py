from flask import Flask, Blueprint, render_template, jsonify, request
from flask_cors import CORS
from routes import index, game

# creating main flask app
# adding CORS to app to allow for access (can be restricted later if needed)
app = Flask(__name__)
CORS(app)

# creating "modular" routes for main entry point into game app and the actual tictactoe move logic
app.register_blueprint(index.indexRoute, url_prefix="/")
app.register_blueprint(game.gameRoute, url_prefix="/game")

if __name__ == '__main__':
    app.run(debug=True)