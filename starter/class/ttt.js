const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    Screen.addCommand('w', 'Move Cursor Up', () => this.cursorUp());
    Screen.addCommand('s', 'Move Cursor Down', () => this.cursorDown());
    Screen.addCommand('a', 'Move Cursor Left', () => this.cursorLeft());
    Screen.addCommand('d', 'Move Cursor Right', () => this.cursorRight());
    Screen.addCommand('x', 'Place X', () => this.placeSymbol("X"));
    Screen.addCommand('o', 'Place O', () => this.placeSymbol("O"));
    this.cursor.setBackgroundColor();
    Screen.render();
    Screen.printCommands();
  }

  //Commands 

  /// Directional movement

  cursorUp() {
    this.cursor.up();
    Screen.render();
    this.cursor._printCoord()
    console.log(`Grid: ${Screen.grid}`);
    Screen.printCommands();
  }
  cursorDown() {
    this.cursor.down();
    Screen.render();
    this.cursor._printCoord()
    Screen.printCommands();
  }
  cursorLeft() {
    this.cursor.left();
    Screen.render();
    this.cursor._printCoord()
    Screen.printCommands();
  }

  cursorRight() {
    this.cursor.right();
    Screen.render();
    this.cursor._printCoord()
    Screen.printCommands();
  }

  placeSymbol(symbol){
    if(TTT.checkWin(Screen.grid) == false){
      const currentPos = this.cursor.pos();
      Screen.setGrid(currentPos[0], currentPos[1], symbol);
      Screen.render();
      this.cursor._printCoord();
      Screen.printCommands();
    }else{
      TTT.endGame(TTT.checkWin(Screen.grid))
    }
  }


  static checkWin(grid) {

    //Horizontal Check
    if(grid.some((row) => row.every((ele)=> ele == 'X'))){
      return 'X';
    }
    if(grid.some((row) => row.every((ele)=> ele == 'O'))){
      return 'O';
    }
    //Vertical Check
    let verticalWins = []
    for(let i = 0; i < grid[0].length; i ++ ){
      verticalWins.push(grid.map((row) => row[i]))
    }
    if(verticalWins.some((row) => row.every((ele) => ele == 'X'))){
      return 'X';
    }
    if(verticalWins.some((row) => row.every((ele) => ele == 'O'))){
      return 'O';
    }
      //Diagonal Check
    let leftToRightDiagonal = [];
    let rightToLeftDiagonal = [];
    let reversedGrid = [...grid].reverse()
    for(let i = 0; i < grid[0].length; i++){
      leftToRightDiagonal.push(grid[i][i]);
    }
    for(let i = grid[0].length - 1; i >= 0 ; i--){
      rightToLeftDiagonal.push(reversedGrid[i][i]);
    }

    if(leftToRightDiagonal.every((ele) => ele == 'X')){
      return 'X';
    }
    if(leftToRightDiagonal.every((ele) => ele == 'O' )){
      return 'O';
    }
    if(rightToLeftDiagonal.every((ele) => ele == 'X')){
      return 'X';
    }
    if(rightToLeftDiagonal.every((ele) => ele == 'O' )){
      return 'O';
    }
    else if (grid.every((row) => row.every((ele) => ele == 'X' || ele == 'O'))){
      return 'T';
    }
    
    
    else{ 
      return false;
    }

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
