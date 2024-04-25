

//-----------------------------------------------WIN CHECKS--------------------------------------------

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