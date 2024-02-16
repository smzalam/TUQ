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
        <div>
            <h1>Tic Tac Toe</h1>
            <table>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <button
                    className="cell"
                    onClick={() => makeMove(rowIndex, colIndex)}
                  >
                    {cell}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </table>
        <p>Current Player: {currentPlayer}</p>
        <p>Current Message: {currentMessage}</p>
        <button
          onClick={() => resetBoard()}
        ></button>
        </div>
    );
};

export default Game