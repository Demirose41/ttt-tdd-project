const TTT = require("./ttt");

class ComputerPlayer {

  static getValidMoves(grid) {
    let validMoves = [];
    for(let i = 0; i < grid.length ; i++){
      for(let j = 0; j < grid.length; j++){
        if(grid[i][j] === ' '){
          validMoves= [...validMoves, {row: i, col: j}];
        }
      }
    }
    return validMoves;
  }

  static randomMove(grid) {
    let validMoves = ComputerPlayer.getValidMoves(grid);
    let randomMove = validMoves[Math.floor(Math.random()*validMoves.length)];
    return randomMove;
  }

  static getWinningMoves(grid, symbol) {
    let validMoves = ComputerPlayer.getValidMoves(grid);
    for(const move of validMoves){
      let tempGrid = grid.map((arr) => arr.slice());
      tempGrid[move.row][move.col] = symbol;
      
      if(TTT.checkWin(tempGrid) === symbol){
        return move;
      }
    }
    return false;

  }

  static getSmartMove(grid, symbol) {
    const opponentSymbol = symbol === "X" ? "O" : "X";
    if(ComputerPlayer.getWinningMoves(grid, symbol)){
      return ComputerPlayer.getWinningMoves(grid, symbol);
    }else if (ComputerPlayer.getWinningMoves(grid, opponentSymbol)){
      return ComputerPlayer.getWinningMoves(grid, opponentSymbol);
    }else{
      return ComputerPlayer.randomMove(grid);
    }


  }

}

module.exports = ComputerPlayer;
