import { useEffect, useState } from 'react'
import axios from 'axios';

const Game = () => {
  const api = 'http://localhost:5000';
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(' ')));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    resetBoard()
  }, []);

  const makeMove = async (row, col) => {
    try {
      const response = await axios.post(`${api}/game/move`, { row, col });
      const data = response.data;
      console.log(data);
      setBoard(data.board)
      setCurrentPlayer(data.currentPlayer)
      setCurrentMessage(data.message)
    } catch (error) {
      console.error('Error making move:', error);
    }
  };

  const resetBoard = async () => {
    try {
      const response = await axios.get(`${api}/game/reset`);
      const data = response.data;
      console.log(data);
      setBoard(data.board)
      setCurrentMessage(data.message)
      setCurrentPlayer(data.currentPlayer)
    } catch (error) {
      console.error('Error resetting board:', error);
    }
  };

  return (
    <div className='flex flex-col w-screen h-screenjustify-center align-middle items-center'>
      <h1 className='m-1 w-screen flex justify-center text-[3rem]'>Tic Tac Toe</h1>
      <div className='flex flex-row gap-4'>
      <p className='text-purple-700 text-lg bg-slate-200 py-5 px-20 rounded-lg'>{currentMessage}</p>
      <p className='text-purple-700 text-lg bg-slate-200 py-5 px-20 rounded-lg'>Player: {currentPlayer}</p>
      </div>
      <div className='bg-blend-overlay grid grid-rows-3 grid-cols-3 rounded-lg p-3 w-max '>
        {board.map(
          (row, rowIdx) =>
            row.map(
              (cell, colIdx) =>
                <div
                  key={`${colIdx}-${rowIdx}`}
                >
                  <div 
                  className='h-24 w-24 xl:h-32 xl:w-32 rounded-md mr-1 mb-1 border-8 border-solid cursor-pointer flex place-items-center justify-center'
                  onClick={() => makeMove(rowIdx, colIdx)}
                  >
                    <text className='text-4xl text-text font-bold'>{cell}</text>
                  </div>
                </div>
            )
        )}
      </div>
      <button
      className='bg-slate-500 rounded-lg px-20 py-3 hover:bg-slate-200 hover:text-purple-700'
        onClick={() => resetBoard()}
      >Reset!</button>
    </div >
  );
};

export default Game