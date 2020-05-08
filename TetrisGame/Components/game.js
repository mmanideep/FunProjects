import React, { Component } from 'react';
import Board from './board';
import Tetromino from "./tetromino";

 /*
    * There would be seven pieces in Tetris following will be the numbers mapped to each piece
    1 -> I
    2 -> O
    3 -> T
    4 -> S
    5 -> Z
    6 -> J
    7 -> L
*/
class Game extends Component{

    constructor(props) {
        super(props);
        
        this.initBoardMatrix = this.initBoardMatrix.bind(this);
        this.updateBoardMatrixWithPixels = this.updateBoardMatrixWithPixels.bind(this);
        
        this.getRandomInt = this.getRandomInt.bind(this);
        this.getRandomTetromino = this.getRandomTetromino.bind(this);
        
        this.canTetrominoMove = this.canTetrominoMove.bind(this);
        this.canTetrominoMoveDown = this.canTetrominoMoveDown.bind(this);
        this.canTetrominoMoveLeft = this.canTetrominoMoveLeft.bind(this);
        this.canTetrominoMoveRight = this.canTetrominoMoveRight.bind(this);

        this.moveTetrominoLeft = this.moveTetrominoLeft.bind(this);
        this.moveTetrominoRight = this.moveTetrominoRight.bind(this);
        this.invertTetromino = this.invertTetromino.bind(this);

        this.updateBoard = this.updateBoard.bind(this);

        this.isGameOver = this.isGameOver.bind(this);
        this.isTheRowFilled = this.isTheRowFilled.bind(this);
        this.isTheRowEmpty = this.isTheRowEmpty.bind(this);

        this.calculateScoreAndUpdateBoard = this.calculateScoreAndUpdateBoard.bind(this);

        this.startGame = this.startGame.bind(this);

        this.state = {
            boardMatrix: [],
            currentTetromino: new Tetromino(this.getRandomTetromino()),
            updateInterval: 300,
            score: 0
        }

    }

    initBoardMatrix() {
        var matrix = [];
        for(var i=0; i<20; i++) {
            matrix[i] = [];
            for(var j=0; j<10; j++) {
                matrix[i][j] = 0;
            }
        }
        let currentTetrominoPixel = this.state.currentTetromino.currentPixels;
        for(let i=0; i<currentTetrominoPixel.length; i++){
            let pixel = currentTetrominoPixel[i];
            matrix[pixel[0]][pixel[1]] = 2;
        }
        this.setState({boardMatrix : matrix});
    }

    updateBoardMatrixWithPixels(currentBoard, pixelsToBeUpdated, pixelValue){
        for(let i=0; i < pixelsToBeUpdated.length; i++){
            let pixel = pixelsToBeUpdated[i];
            currentBoard[ pixel[0] ][ pixel[1] ] = pixelValue;
        }
        return currentBoard;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomTetromino(){
       return this.getRandomInt(1,7);
    }

    canTetrominoMove(nextPixels){
        for(let i=0; i<nextPixels.length; i++){
            let pixel = nextPixels[i];
            if (pixel[0] >= this.state.boardMatrix.length || pixel[0] < 0){
                return false
            }
            if (pixel[1] >= this.state.boardMatrix[pixel[0]].length || pixel[1] < 0){
                return false
            }
            if (this.state.boardMatrix[pixel[0]][pixel[1]] == 1){
                return false
            }
        }
        return true;
    }

    canTetrominoMoveDown(){
        let nextPixels = this.state.currentTetromino.getNextCoordinates(null, false);
        return this.canTetrominoMove(nextPixels);
    }

    canTetrominoMoveLeft(){
        let nextPixels = this.state.currentTetromino.getNextCoordinates(-1, false);
        return this.canTetrominoMove(nextPixels);
    }

    canTetrominoMoveRight(){
        let nextPixels = this.state.currentTetromino.getNextCoordinates(1, false);
        return this.canTetrominoMove(nextPixels);
    }

    canTetrominoInvert(){
        let nextPixels = this.state.currentTetromino.getNextCoordinates(0, false);
        return this.canTetrominoMove(nextPixels);
    }

    isGameOver() {
        
        let checkPixels = [[0,3], [0,4], [0,5], [0,6]];

        for (let i = 0; i < checkPixels.length; i++){
            let row = checkPixels[i][0];
            let col = checkPixels[i][1];
            if(this.state.boardMatrix[row][col] == 1){
                return true;
            }
        }
        return false;
    }

    isTheRowFilled(rowIndx, boardMatrix) {
        let currentRow = boardMatrix[rowIndx];
        for(let col = 0; col < currentRow.length; col++){
            if(boardMatrix[rowIndx][col] < 1){
                return false;
            }
        }
        return true;
    }

    isTheRowEmpty(rowIndx, boardMatrix) {
        let currentRow = boardMatrix[rowIndx];
        for(let col = 0; col < currentRow.length; col++){
            if(boardMatrix[rowIndx][col] > 0){
                return false;
            }
        }
        return true;
    }

    moveTetrominoLeft(){
        let isPossibleMove = this.canTetrominoMoveLeft();
        
        if(isPossibleMove){
            let previousPixels = this.state.currentTetromino.currentPixels;
            let nextPixels = this.state.currentTetromino.getNextCoordinates(-1, true);
            let currentBoard = this.state.boardMatrix;
            currentBoard = this.updateBoardMatrixWithPixels(currentBoard, previousPixels, 0);
            currentBoard = this.updateBoardMatrixWithPixels(currentBoard, nextPixels, 2);
            this.setState({boardMatrix: currentBoard});
        }
    }

    moveTetrominoRight(){
        if(this.canTetrominoMoveRight() === true){
            let previousPixels = this.state.currentTetromino.currentPixels;
            let nextPixels = this.state.currentTetromino.getNextCoordinates(1, true);
            let currentBoard = this.state.boardMatrix;
            currentBoard = this.updateBoardMatrixWithPixels(currentBoard, previousPixels, 0);
            currentBoard = this.updateBoardMatrixWithPixels(currentBoard, nextPixels, 2);
            this.setState({boardMatrix: currentBoard});
        }
    }

    invertTetromino(){
        if(this.canTetrominoInvert() === true){
            let previousPixels = this.state.currentTetromino.currentPixels;
            let nextPixels = this.state.currentTetromino.getNextCoordinates(0, true);
            let currentBoard = this.state.boardMatrix;
            currentBoard = this.updateBoardMatrixWithPixels(currentBoard, previousPixels, 0);
            currentBoard = this.updateBoardMatrixWithPixels(currentBoard, nextPixels, 2);
            this.setState({boardMatrix: currentBoard});
        }
    }

    calculateScoreAndUpdateBoard(boardMatrix){
        let addScore = 0;

        let newBoardMatrix = [];
        for (var row = 0; row < boardMatrix.length; row++){
            newBoardMatrix[row] = [];
            for (let col = 0; col < boardMatrix[row].length; col++){
                newBoardMatrix[row][col] = boardMatrix[row][col];
            }
        }

        for (let i = boardMatrix.length - 1; i >= 0; i--){
            let rowIndx = i;
            
            if(this.isTheRowFilled(rowIndx, newBoardMatrix)){
                addScore += 10;
                for (let row = rowIndx; row >= 1; row --){    
                    for(let col=0; col < newBoardMatrix[row].length; col++){
                        newBoardMatrix[row][col] = newBoardMatrix[row - 1][col];
                    }
                }
            }
            else if (this.isTheRowEmpty(rowIndx, newBoardMatrix)){
                break;
            }
        }

        if (addScore > 0){
            let tempScore = 0;
            [tempScore, newBoardMatrix] = this.calculateScoreAndUpdateBoard(newBoardMatrix);
            addScore += tempScore;
        }

        return [addScore, newBoardMatrix];
    }

    updateBoard(){

        let gameFinished = this.isGameOver();
        if(gameFinished === true){
            alert("Game Over!!!!");
            return
        }
        else{
            let nextPixels;
            let newTetromino;
            let calculatedScore;
            let currentBoard = this.state.boardMatrix;
            let previousPixels = this.state.currentTetromino.currentPixels;
            currentBoard = this.updateBoardMatrixWithPixels(currentBoard, previousPixels, 0);

            if (this.canTetrominoMoveDown()){
                nextPixels = this.state.currentTetromino.getNextCoordinates(null, true);
                currentBoard = this.updateBoardMatrixWithPixels(currentBoard, nextPixels, 2);
            }
            else{
                nextPixels = this.state.currentTetromino.currentPixels;
                currentBoard = this.updateBoardMatrixWithPixels(currentBoard, nextPixels, 1);
                if(this.isGameOver() == true){
                    alert("Game Over!!!!");
                    return;
                }
                else{
                    newTetromino = new Tetromino(this.getRandomTetromino());
                    nextPixels = newTetromino.currentPixels;
                    currentBoard = this.updateBoardMatrixWithPixels(currentBoard, nextPixels, 2);
                }
            }

            if (newTetromino != undefined){
                [calculatedScore, currentBoard] = this.calculateScoreAndUpdateBoard(currentBoard);
                let playerScore = this.state.score + calculatedScore;    
                this.setState(
                    {
                        boardMatrix: currentBoard, 
                        currentTetromino: newTetromino,
                        score: playerScore
                    }, () => {setTimeout(this.updateBoard, this.state.updateInterval);});
            }
            else{
                this.setState({boardMatrix: currentBoard}, () => {setTimeout(this.updateBoard, this.state.updateInterval);});
            }
        }
    }

    startGame() {
        
        setInterval(
            () => {
                this.setState({updateInterval: this.state.updateInterval - 50});
            }, 60000);
        this.updateBoard();
    }

    componentDidMount(){
        this.initBoardMatrix();
    }

    render(){
        return(<Board 
                    BoardMatrix={this.state.boardMatrix} 
                    StartGame={this.startGame.bind(this)}
                    OnMoveLeft={this.moveTetrominoLeft.bind(this)}
                    OnMoveRight={this.moveTetrominoRight.bind(this)}
                    OnInvertTetromino={this.invertTetromino.bind(this)}
                    Score={this.state.score}
                />);
    }

}

export default Game;
