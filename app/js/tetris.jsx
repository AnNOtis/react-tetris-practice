'use strict'
/*
- Tetris
  - Game
    - Row
      - Cell
  - Dashboard
    - NextBlock
    - Score
*/
var React = require('react')
var Gameboard = require('./gameboard')
var Dashboard = require('./dashboard')
module.exports = React.createClass({
  displayName: 'Tetris',
  getInitialState: function(){
    return {
      start: false,
      score: 0
    };
  },
  addScore: function(score){
    this.setState({score: this.state.score+score})
  },
  render: function(){
    return (
      <div className="tetris">
        <h1>Tetris Game</h1>
        <Gameboard xSize={10} ySize={24} start={this.state.start} addScore={this.addScore} />
        <Dashboard score={this.state.score} />
      </div>
    );
  }
})