import React, { Component } from 'react';
import './board.css';

class Board extends Component{
    constructor(props){
        super(props);

        this.onKeyPressed = this.onKeyPressed.bind(this);
    };

    onKeyPressed(e){
        if (e.keyCode == '38') {
            // up arrow
            this.props.OnInvertTetromino();
        }
        else if (e.keyCode == '37') {
           // left arrow
           this.props.OnMoveLeft();
        }
        else if (e.keyCode == '39') {
           // right arrow
           this.props.OnMoveRight();
        }
    }

    render(){
        return(
            <div className="container-fluid h-100" tabIndex="0" onKeyDown={this.onKeyPressed}>
                <div className="row h-75">
                    <div className="col h-100">
                        <div className="container-fluid h-100">
                            <div className="row d-flex justify-content-around">
                                <div className="col-xs-10">
                                <table>
                                    <tbody>
                                        {
                                            this.props.BoardMatrix.map((row, i) => (
                                                <tr key={i}>
                                                    {
                                                        row.map((col, j) => (
                                                            <td className={"border-0 p-0 boardPixel-" + col} key={j}>
                                                            </td>  
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                </div>
                                <div className="col-xs-2">
                                <div className="card text-center mt-3">
                                    <h5 className="card-header">
                                        Tetris - M.Manideep
                                    </h5>
                                    <div className="card-body">
                                        <h5 className="card-title">Your score: {parseInt(this.props.Score) || 0}</h5>
                                        <a href="#" className="btn btn-success" onClick={this.props.StartGame}>StartGame</a>
                                        <p className="card-text">Use arrow keys to move</p>
                                        <button className="btn" onClick={this.props.OnMoveLeft}><i class="material-icons">keyboard_arrow_left</i></button>
                                        <button className="btn" onClick={this.props.OnInvertTetromino}><i class="material-icons">keyboard_arrow_up</i></button>
                                        <button className="btn" onClick={this.props.OnMoveRight}><i class="material-icons">keyboard_arrow_right</i></button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;