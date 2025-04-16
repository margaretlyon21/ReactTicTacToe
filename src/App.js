import { useState } from "react";

function Square({ value, onSquareClick, color }) {
  return (
    <button className="square" onClick={onSquareClick} style={{ color: color }}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winData = calculateWinner(squares);
  function handleClick(i) {
    if (winData[0] || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = winData[0];
  let status;
  if (winner) {
    status = "Winner: " + winner;
    line = winData[1];
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
    line = winData[1];
  }

  function colorWinners(i) {
    if (line && line.includes(i)) {
      return "red";
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          color={colorWinners(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          color={colorWinners(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          color={colorWinners(1)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          color={colorWinners(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          color={colorWinners(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          color={colorWinners(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          color={colorWinners(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          color={colorWinners(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          color={colorWinners(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let desription;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <p>
          {currentMove === 9
            ? "Game over, no winner!"
            : `You are on move number ${currentMove}`}
        </p>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}
