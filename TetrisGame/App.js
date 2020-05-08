import React, { Component } from 'react';
import Game from './Components/game';

class App extends Component{
   render(){
       return(
         <div className="container-fluid fullHeight">
            <div className="row">
                <div className="col-10 offset-1">
                    <h1>Tetris Game</h1>
                </div>
            </div>
            <div className="row fullHeight">
                <div className="col">
                    <Game/>
                </div>
            </div>
         </div>
      );
   }
}
export default App;