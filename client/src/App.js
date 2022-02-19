// React
import React, { useState } from "react";

// CSS
import "./App.css";

// Components
import Title from "./components/Title";
import Footer from "./components/Footer";

const App = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [2, 4, 6],
        [0, 4, 8],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (number) => {
    if (cells[number] !== "") {
      alert("Já foi clicado!");
      return;
    }
    let squares = [...cells];

    if (turn === "X") {
      squares[number] = "X";
      setTurn("O");
    } else {
      squares[number] = "O";
      setTurn("X");
    }
    checkWinner(squares);
    setCells(squares);
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cell = ({ number }) => {
    return (
      <div className="cell" onClick={() => handleClick(number)}>
        {cells[number]}
      </div>
    );
  };

  return (
    <div className="container">
      <Title title={"Jogo da velha!"}/>
      <div className="tictactoe">
        <p>Vez de: {turn}</p>
        <div className="table">
          <div className="row">
            <Cell number={0} />
            <Cell number={1} />
            <Cell number={2} />
          </div>
          <div className="row">
            <Cell number={3} />
            <Cell number={4} />
            <Cell number={5} />
          </div>
          <div className="row">
            <Cell number={6} />
            <Cell number={7} />
            <Cell number={8} />
          </div>
        </div>
        <div className="results">
          <p className={`winner ${winner ? "show" : ""}`}>{winner} é o vencedor!</p>
          <button onClick={() => handleRestart()}>Reiniciar</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
