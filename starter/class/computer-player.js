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

  static _freeCorners(grid){
    const corners = [[0,0],[0,2],[2,0],[2,2]];
    let freeCorners = [];
    for(const corner of corners){
      if(grid[corner[0]][corner[1]] === ' '){
        freeCorners = [...freeCorners, {row: corner[0], col: corner[1]}]
      }
    }
    return freeCorners;
  }

  static _emptyGrid(grid){
    if(grid.every((row) => row.every((space) => space === ' '))){
      return true
    }
  }
  static _emptyMid(grid){
    if(grid[1][1] === ' '){
      return true
    }
  }

  static _goingSecond(grid){
    if(grid.flat().filter((ele)=> ele !== ' ').length === 1){
      return true;
    }
    return false;
  }
  static _trapSet(grid, opponentSymbol){
    const trapPositions = [[[0,0],[2,2]],[[0,2],[2,0]]];
    for(const trap of trapPositions){
      if(grid[trap[0][0]][trap[0][1]] === opponentSymbol && grid[trap[1][0]][trap[1][1]] === opponentSymbol){
        return grid[trap[0][0]][trap[1][1]] === ' ' ? {row: trap[0][0], col: trap[1][1]} : {row: trap[1][1], col: trap[0][0]};
      }
    }
    return false;
  }

  static getSmartMove(grid, symbol) {
    const opponentSymbol = symbol === "X" ? "O" : "X";
    // Will prioritize placing winning move if available
    if(ComputerPlayer.getWinningMoves(grid, symbol)){
      return ComputerPlayer.getWinningMoves(grid, symbol);
    }else if (ComputerPlayer.getWinningMoves(grid, opponentSymbol)){
      return ComputerPlayer.getWinningMoves(grid, opponentSymbol);
    }else if(ComputerPlayer._emptyGrid(grid)){
      return {row: 1, col: 1};
    }else if(ComputerPlayer._emptyMid(grid)){
      return {row: 1, col: 1};
    }else if(ComputerPlayer._goingSecond(grid)){
      return ComputerPlayer._freeCorners(grid)[0];
    }else if(ComputerPlayer._trapSet(grid, opponentSymbol)){
      return ComputerPlayer._trapSet(grid,opponentSymbol);
    }else if(ComputerPlayer._freeCorners(grid).length > 0){
      return ComputerPlayer._freeCorners(grid)[0]
    }else{
      return ComputerPlayer.randomMove(grid);
    }
  }
}

module.exports = ComputerPlayer;
