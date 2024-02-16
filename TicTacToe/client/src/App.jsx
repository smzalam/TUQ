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
    <div className='w-full h-full bg-black'>
      {gameStatus ? (
        <Game />
      ) : (
        <>
        <h1>{message}</h1>
          <button onClick={() => setGameStatus(true)}>Play Game!</button>
          </>
      )}

    </div>
  );
}

export default App;
