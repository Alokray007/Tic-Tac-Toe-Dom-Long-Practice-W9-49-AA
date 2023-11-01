window.addEventListener("DOMContentLoaded", e => {

  let currentPlayer = "X";

  const cells = document.querySelectorAll(".cell");
  const header = document.querySelector("h1");
  const newGameButton = document.getElementById("new-game");
  const giveUpButton = document.getElementById("give-up");

  // Function to handle cell click event Phase-2
  function handleCellClick(e) {
    const cell = e.target;
    const newElem = document.createElement("img");

    if(!cell.contains(newElem)) {
      newElem.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currentPlayer.toLowerCase()}.svg`;
      newElem.alt = `Player is ${currentPlayer}`;
      newElem.id = "imgId";
      cell.classList.add(currentPlayer.toLowerCase());
      cell.appendChild(newElem);
      localStorage.setItem(cell.id, currentPlayer);            // Set status to Local storage
      cell.removeEventListener("click", handleCellClick);

      if (checkWin() || checkTie()) {
        endGame()
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  // Function to handle Reload event Phase-7
  function handleReload() {
    cells.forEach((cell) => {
      const storedId = localStorage.getItem(cell.id);
      const headerText = localStorage.getItem("header");

      if (storedId !== null) {
        const newElem = document.createElement("img");
        newElem.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${storedId.toLowerCase()}.svg`;
        newElem.alt = `Player is ${storedId}`;
        newElem.id = "imgId";
        cell.appendChild(newElem);

        header.textContent = headerText;
        cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
        newGameButton.disabled = false;
        giveUpButton.disabled = true;
      }
    });
  };


  // Function to check for a win Phase-3
  function checkWin() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        cells[a].classList.contains(currentPlayer.toLowerCase()) &&
        cells[b].classList.contains(currentPlayer.toLowerCase()) &&
        cells[c].classList.contains(currentPlayer.toLowerCase())
      ) {
        return true; // Player wins
      }
    }
    return false;
  }

  // Function to check for a Tie Phase-3
  function checkTie() {
    return [...cells].every((cell) => cell.classList.contains("x") || cell.classList.contains("o"));
  }

  // Function to handle Finished game
  function endGame() {
    cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
    newGameButton.disabled = false;
    giveUpButton.disabled = true;

    if (checkWin()) {
      header.textContent = `Winner: ${currentPlayer.toUpperCase()}`;
    } else {
      header.textContent = `Winner: None`;
    }
    localStorage.setItem("header", header.textContent);
  }

  // Event listeners for cell clicks
  cells.forEach(cell => cell.addEventListener("click", handleCellClick));

  //Phase-5
  function handleNewButtonClick() {
    cells.forEach((cell) => {
      cell.classList.remove("o", "x");
      let newElem1 = document.getElementById("imgId");
      localStorage.removeItem(cell.id);
      localStorage.removeItem("header");
      if(cell.contains(newElem1)){
        newElem1.remove();
      }
      cell.addEventListener("click", handleCellClick);
    })

    newGameButton.disabled = true;
    giveUpButton.disabled = false;
    header.textContent= "";
    currentPlayer = "X";
  };

  newGameButton.addEventListener("click", handleNewButtonClick)

  //Phase-6
  giveUpButton.addEventListener("click", () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    header.textContent = `Winner: ${currentPlayer.toUpperCase()}`;
    localStorage.setItem("header", header.textContent);                // data saved to local storage
    giveUpButton.disabled = true;
    newGameButton.disabled = false;
  })

  if (window.onload) {
    newGameButton.disabled = false;
  } else {
    newGameButton.disabled = true;
  }

  // Setup for computer to play randomly
  //   function computerPlay() {
  //   const randomNum = Math.floor(Math.random()*9);
  //   const comp = currentPlayer;

  // }

  // const singlePlayer = document.getElementById("comp")
  // singlePlayer.addEventListener("click", computerPlay)


  window.onbeforeunload = handleReload();

})





























// window.addEventListener("DOMContentLoaded", (e) => {
//   let currentPlayer = "X";

//   const cells = document.querySelectorAll(".cell");
//   const newGameButton = document.getElementById("new-game");
//   const giveUpButton = document.getElementById("give-up");
//   const header = document.querySelector("h1");

//   // Function to handle cell click event
//   function handleCellClick(event) {
//     const cell = event.target;
//      // extra
//      const newElem = document.createElement("img");

//     // Check if the cell is empty
//     if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
//       newElem.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currentPlayer.toLowerCase()}.svg`;
//       newElem.alt = `Player is ${currentPlayer}`;
//       cell.appendChild(newElem);
//       cell.classList.add(currentPlayer.toLowerCase()); // Add X or O class
//       // localStorage.setItem(event.target.id, currentPlayer);
//       cell.removeEventListener("click", handleCellClick); // Disable further clicks on the cell

//       // Check for a win or tie
//       if (checkWin() || checkTie()) {
//         endGame();
//       } else {
//         currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
//       }
//     }
//   }

//   // Function to check for a win
//   function checkWin() {
//     const winningCombos = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8], // Rows
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8], // Columns
//       [0, 4, 8],
//       [2, 4, 6], // Diagonals
//     ];

//     for (const combo of winningCombos) {
//       const [a, b, c] = combo;
//       if (
//         cells[a].classList.contains(currentPlayer.toLowerCase()) &&
//         cells[b].classList.contains(currentPlayer.toLowerCase()) &&
//         cells[c].classList.contains(currentPlayer.toLowerCase())
//       ) {
//         return true; // Player wins
//       }
//     }

//     return false;
//   }

//   // Function to check for a tie
//   function checkTie() {
//     return [...cells].every(
//       (cell) => cell.classList.contains("x") || cell.classList.contains("o")
//     );
//   }

//   // Function to end the game
//   function endGame() {
//     cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
//     newGameButton.disabled = false;
//     giveUpButton.disabled = true;

//     if (checkWin()) {
//       header.textContent = `Winner: ${currentPlayer}`;
//     } else {
//       header.textContent = "Winner: None (Tie)";
//     }
//   }

//   // Event listeners for cell clicks
//   cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

//   // Event listener for New Game button
//   newGameButton.addEventListener("click", () => {
//     cells.forEach((cell) => {
//       cell.classList.remove("x", "o");
//       cell.removeChild(newElem);
//       cell.addEventListener("click", handleCellClick);
//     });
//     newGameButton.disabled = true;
//     giveUpButton.disabled = false;
//     header.textContent = "Tic-Tac-Toe";
//     currentPlayer = "X";
//   });

//   // Event listener for Give Up button
//   giveUpButton.addEventListener("click", () => {
//     currentPlayer = currentPlayer === "X" ? "O" : "X";
//     header.textContent = `Winner: ${currentPlayer}`;
//     newGameButton.disabled = false;
//     giveUpButton.disabled = true;
//     cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
//     // endGame();
//   });

//   // Initial game setup
//   newGameButton.disabled = true;
// });
