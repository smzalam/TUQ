// src/App.jsx (or src/App.js)

import { useState, useEffect } from 'react';
import axios from 'axios';
import Game from './Game/game';

function App() {

  const api = 'http://localhost:5000/';
  const [message, setMessage] = useState('');
  const [gameStatus, setGameStatus] = useState(false);

  useEffect(() => {
    // Make a GET request to the Flask backend
    axios.get(api)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='w-screen h-screen bg-green-300 flex justify-center items-center'>
      {gameStatus ? (
        <Game />
      ) : (
        <div className='grid col-2 gap-5 p-5 rounded-lg bg-green-400'>
          <h1 className='text-4xl'>{message}</h1>
          <button
            className='text-white text-lg p-5 rounded-lg bg-purple-400 hover:bg-white hover:text-black'
            onClick={() => setGameStatus(true)}>
            Play Game!
          </button>
        </div>
      )}

    </div>
  );
}

export default App;
