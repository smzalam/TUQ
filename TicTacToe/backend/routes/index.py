from flask import Flask, Blueprint, render_template, jsonify, request

# main entry point into backend api
# modularized through 'Blueprints' in Flask 
indexRoute = Blueprint('/', __name__)

# simply returns a welcome message 
# (lets us know api is working and connection between client and server is well)
@indexRoute.route('/')
def home():
    # returns a jsonified messaged to JS frontend
    return jsonify(message='Welcome to TicTacToe!')