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
  render: function(){
    return (
      <div className="tetris">
        <h1>Tetris Game</h1>
        <Gameboard />
        <Dashboard />
      </div>
    );
  }
})