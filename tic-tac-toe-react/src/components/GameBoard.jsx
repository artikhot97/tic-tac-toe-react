import { useState } from "react";

export default function GameBoard({ onSelectSqure, board }) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectSqure(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updateGameBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];

  //       updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updateGameBoard;
  //     });

  //     onSelectSqure();
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, playerSymbolIndex) => (
              <li key={playerSymbolIndex}>
                <button
                  onClick={() => onSelectSqure(rowIndex, playerSymbolIndex)}
                  disabled={playerSymbol != null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
