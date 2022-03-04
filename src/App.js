import React, { useState } from "react";
import "./App.css";

function App() {
  const [roomba, setRoomba] = useState({
    row: 0,
    column: 0,
    position: "right",
  });

  const arrowPosition = () => {
    if (roomba.position == "right") {
      return "→";
    } else if (roomba.position == "down") {
      return "↓";
    } else if (roomba.position == "left") {
      return "←";
    } else if (roomba.position == "up") {
      return "↑";
    }
  };
  // This is the cell -> column -> grid functions

  const createCell = (i, j) => {
    if (roomba.row === j && roomba.column == i) {
      return (
        <div className="cell" id={(i, j)}>
          {arrowPosition()}
        </div>
      );
    }
    return <div className="cell" id={(i, j)}></div>;
  };

  const createColumn = (i) => {
    let cells = [];
    for (let j = 0; j < 10; j++) {
      cells.push(createCell(i, j));
    }
    return <div className="column">{cells}</div>;
  };

  const createGrid = () => {
    let grid = [];
    for (let i = 0; i < 10; i++) {
      grid.push(createColumn(i));
    }
    console.log(grid);
    return grid;
  };

  // the functions related to movement
  const moveForward = () => {
    if (roomba.position == "right") {
      if (roomba.column !== 9) {
        setRoomba({ ...roomba, column: roomba.column + 1 });
      } else {
        turnRight();
      }
    } else if (roomba.position == "down") {
      if (roomba.row !== 9) {
        setRoomba({ ...roomba, row: roomba.row + 1 });
      } else {
        turnRight();
      }
    } else if (roomba.position == "left") {
      if (roomba.column !== 0) {
        setRoomba({ ...roomba, column: roomba.column - 1 });
      } else {
        turnRight();
      }
    } else if (roomba.position == "up") {
      if (roomba.row !== 0) {
        setRoomba({ ...roomba, row: roomba.row - 1 });
      } else {
        turnRight();
      }
    }
  };

  const turnRight = () => {
    if (roomba.position == "right") {
      setRoomba({ ...roomba, position: "down" });
    }
    if (roomba.position == "down") {
      setRoomba({ ...roomba, position: "left" });
    }
    if (roomba.position == "left") {
      setRoomba({ ...roomba, position: "up" });
    }
    if (roomba.position == "up") {
      setRoomba({ ...roomba, position: "right" });
    }
  };

  return (
    <div className="App">
      <button className="move-forward" onClick={moveForward}>
        Move Forward
      </button>
      <button className="turn-right" onClick={turnRight}>
        Turn Right
      </button>
      <div className="grid">{createGrid()}</div>
    </div>
  );
}

export default App;
