import { useState } from 'react';
import './Scoring';




//generate a square component. each object can only return one thing
function Square({ value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(42).fill(null)); // this is used to store game state and tell square what to put in it
 

  //we are passing the handle click to square
  function handleClick(i) {


    //check if the square is used    
    if (squares[i] || calculateWinner(squares) || tie(squares))
    {
      return;
    }
    const nextSquares = squares.slice();
    
    if(xIsNext){
      nextSquares[dropposition(i)] = "🔴";
    }
    else
    {
      nextSquares[dropposition(i)] = "🟡";
    }

    setSquares(nextSquares); // updating state redraws components
    setXIsNext(!xIsNext); //alternate player
  
  }
  
  const winner = calculateWinner(squares);
  const t = tie(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } 
  else if (t)
  {
    status = "Tie Game";
  }
  else {
    status = "Next player: " + (xIsNext ? "🔴" : "🟡");
  }

  return (
    //JSX empty object with no tag ID
    <>  
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} />   
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} /> 
      </div>
      <div className="board-row">
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
        <Square value={squares[16]} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} onSquareClick={() => handleClick(17)} />
        <Square value={squares[18]} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} onSquareClick={() => handleClick(19)} />   
        <Square value={squares[20]} onSquareClick={() => handleClick(20)} /> 
      </div>
      <div className="board-row">
        <Square value={squares[21]} onSquareClick={() => handleClick(21)} />
        <Square value={squares[22]} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} onSquareClick={() => handleClick(23)} />
        <Square value={squares[24]} onSquareClick={() => handleClick(24)} />
        <Square value={squares[25]} onSquareClick={() => handleClick(25)} />
        <Square value={squares[26]} onSquareClick={() => handleClick(26)} />
        <Square value={squares[27]} onSquareClick={() => handleClick(27)} />
      </div>
      <div className="board-row">
        <Square value={squares[28]} onSquareClick={() => handleClick(28)} />
        <Square value={squares[29]} onSquareClick={() => handleClick(29)} />
        <Square value={squares[30]} onSquareClick={() => handleClick(30)} />
        <Square value={squares[31]} onSquareClick={() => handleClick(31)} />
        <Square value={squares[32]} onSquareClick={() => handleClick(32)} />
        <Square value={squares[33]} onSquareClick={() => handleClick(33)} />   
        <Square value={squares[34]} onSquareClick={() => handleClick(34)} /> 
      </div>
      <div className="board-row">
        <Square value={squares[35]} onSquareClick={() => handleClick(35)} />
        <Square value={squares[36]} onSquareClick={() => handleClick(36)} />
        <Square value={squares[37]} onSquareClick={() => handleClick(37)} />
        <Square value={squares[38]} onSquareClick={() => handleClick(38)} />
        <Square value={squares[39]} onSquareClick={() => handleClick(39)} />
        <Square value={squares[40]} onSquareClick={() => handleClick(40)} />   
        <Square value={squares[41]} onSquareClick={() => handleClick(41)} /> 
      </div>

      <div>
        <button className="reset" onClick={() => {
                setSquares(Array(42).fill(null));
                setXIsNext(true);
                status = "Next player: " + (xIsNext ? "🔴" : "🟡")
          }}>
          Reset
        </button>
      </div>
    </>
  );


  function tie(squares)
  {
    const rows = 1; 
    const cols = 7; 
  
    const tie = checktie(squares, rows, cols);
    if (tie) 
    {
      return tie;
    }
  }

  
  function calculateWinner(squares) 
  {
    const rows = 6; 
    const cols = 7; 
    
    const hWinner = checkHor(squares, rows, cols);
    if (hWinner) 
    {
      return hWinner;
    }
    const vWinner = checkVer(squares, rows, cols);
    if (vWinner) 
    {
      return vWinner;
    }
  
    const dWinner = checkDiag(squares, rows, cols);
    if (dWinner) 
    {
      return dWinner;
    }


    return null; // No winner
  }


  //function to move game pieces down
  function dropposition(p)
  {
    let k = p;
      while(squares[k + 7] == null && k < (p+35) && (k+7)< 42)
      {
        k = k+7;
      }

      return k;
  }

//-----------------------------------------------WIN CHECKS--------------------------------------------
 
function checktie(squares, rows, cols)
{
  {
    for (let row = 0; row < rows; row++) 
    {
      for (let col = 0; col < cols - 3; col++) 
      {
        const index = row * cols + col;
        const line = [index, index + 1, index + 2, index + 3, index + 4, index +5, index+ 6];

        const [a, b, c, d,e,f, g] = line;
        if (squares[a]  !== null && squares[b] !== null && squares[c] !== null && squares[d]!== null&& squares[e]!== null&& squares[f]!== null&& squares[g]!== null) 
        {
          return true;
        }
      }
    }

  return null; // No tie
  }
}



  function checkHor(squares, rows, cols)
  {
    for (let row = 0; row < rows; row++) 
    {
      for (let col = 0; col < cols - 3; col++) 
      {
        const index = row * cols + col;
        const line = [index, index + 1, index + 2, index + 3];

        const [a, b, c, d] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) 
        {
          return squares[a]; // Return the winner ("🔴" or "🟡")
        }
      }
    }

  return null; // No winner horizontally
  }

  function checkVer(squares, rows, cols) 
  {
  
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 3; row++) 
      {
        const index = row * cols + col;
        const line = [index, index + cols, index + 2 * cols, index + 3 * cols];
  
        const [a, b, c, d] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d])
        {
          return squares[a]; // Return the winner ("🔴" or "🟡")
        }
      }
    }
  
    return null; // No winner vertically
  }

  function checkDiag(squares, rows, cols) 
  {
  
    for (let col = 0; col < cols - 3; col++) 
    {
      for (let row = 0; row < rows - 3; row++) 
      {
        const index = row * cols + col;
        
        // Diagonal from top-left to bottom-right
        const diag1 = [index, index + cols + 1, index + 2 * cols + 2, index + 3 * cols + 3];
  
        // Diagonal from top-right to bottom-left
        const diag2 = [index + 3, index + cols + 2, index + 2 * cols + 1, index + 3 * cols];
  
        const [a, b, c, d] = diag1;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d])
        {
          return squares[a]; // Return the winner ("🔴" or "🟡")
        }
  
        const [e, f, g, h] = diag2;
        if (squares[e] && squares[e] === squares[f] && squares[e] === squares[g] && squares[e] === squares[h]) 
        {
          return squares[e]; // Return the winner ("🔴" or "🟡")
        }
      }
    }
  
    return null; // No winner diagonally
  } 

}
