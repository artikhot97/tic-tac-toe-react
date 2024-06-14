import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTrun) {
  let currentPlayer = "X";

  if (gameTrun.length > 0 && gameTrun[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTrun, setGameTurn] = useState([]);
  const [player, setPlayer] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const activePlayer = derivedActivePlayer(gameTrun);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  let winner;

  for (const turn of gameTrun) {
    const { squre, player } = turn;
    const { row, col } = squre;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqureSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const seconfSqureSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSqureSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSqureSymbol &&
      firstSqureSymbol == seconfSqureSymbol &&
      firstSqureSymbol == thirdSqureSymbol
    ) {
      winner = player[firstSqureSymbol];
    }
  }

  const hasDraw = gameTrun.length === 9 && !winner;

  function handleSelectSqure(rowIndex, colIndex) {
    setGameTurn((prevGameTurn) => {
      const currentPlayer = derivedActivePlayer(prevGameTurn);
      const updatedTurn = [
        { squre: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn,
      ];
      return updatedTurn;
    });
  }

  function handleRematch() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            intialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectSqure={handleSelectSqure} board={gameBoard} />
      </div>
      <Log turns={gameTrun} />
    </main>
  );
}

export default App;
