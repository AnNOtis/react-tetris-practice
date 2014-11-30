'user strict'

React = require('react')
Cell = require('./cell')
module.exports = React.createClass({
  displayName: "Gameboard",
  getInitialState: function() {
    return {
      gridData: this.getInitialGrid(),
      currentBlock: null,
      nextBlock: null
    };
  },
  getDefaultProps: function(){
    return {
      I:{
        name:"I",
        shape:
          [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
          ],
        color: "#007C97", //cyan
        position: [4,0]
      },
      J:{
        name:"J",
        shape:
          [

            [0,1,0],
            [0,1,0],
            [1,1,0]
          ],
        color: "#2676CD", //blue
        position: [4,1]
      },
      L:{
        name:"L",
        shape:
          [
            [0,1,0],
            [0,1,0],
            [0,1,1]
          ],
        color: "#FFA35B", //orange
        position: [4,1]
      },
      O:{
        name:"O",
        shape:
          [
            [1,1],
            [1,1],
          ],
        color: "#FFD476", //yellow
        position: [4,2]
      },
      S:{
        name:"S",
        shape:
          [

            [0,1,0],
            [0,1,1],
            [0,0,1]
          ],
        color: "#6FBF5D", //green
        position: [4,1]
      },
      T:{
        name:"T",
        shape:
          [

            [0,0,0],
            [1,1,1],
            [0,1,0]
          ],
        color: "#BA88CE", //purple
        position: [4,1]
      },
      Z:{
        name:"Z",
        shape:
          [
            [0,1,0],
            [1,1,0],
            [1,0,0]
          ],
        color: "#CC4040", //red
        position: [4,1]
      }
    }
  },
  componentWillMount: function(){
    this.setState({
      currentBlock: this.getNextBlock(),
      nextBlock: this.getNextBlock()
    });
  },
  componentDidMount: function(){
    setInterval(function() {
      var currentBlock = this.state.currentBlock;
      currentBlock.position[1]++;
      this.setState({
        currentBlock: currentBlock
      })
      this.setState({
        gridData: this.generateGridData()

      })
    }.bind(this), 1000);
  },
  getInitialGrid: function(){
    var rowNum = 24;
    var columnNum = 10;
    var grid = new Array(columnNum)
    for (var x = 0; x <= rowNum-1; x++) {
      grid[x] = new Array(rowNum);
      for (var y = 0; y <= columnNum-1; y++) {
        grid[x][y] = 0
      };
    };
    return grid;
  },
  getNextBlock: function(){
    var blocks = ["I","J","L","O","S","T","Z"];
    var choose = Math.floor(Math.random()*(blocks.length-1));
    console.log(choose);
    console.log(blocks[choose]);
    return this.props[blocks[choose]];
  },
  updateBlockPosition: function(){

  },
  updateRectangle: function(block){
    console.log("!!!");
    console.log(block);
    console.log("!!!");
    return {
      x1: block.position[0],
      x2: block.position[0] + block.shape[0].length-1,
      y1: block.position[1],
      y2: block.position[1] + block.shape.length-1,
    }
  },
  renderGrid: function(){
  },
  generateGridData: function () {
    var block = this.state.currentBlock;
    console.log(block);
    var range = this.updateRectangle(block);
    var gridData = this.state.gridData;
    var shapeIndexX = 0;
    console.log(range);
    for (var x = range.x1; x <= range.x2; x++) {
      var shapeIndexY = 0;
      for (var y = range.y1; y <= range.y2; y++) {
        console.log(shapeIndexX+","+shapeIndexY+":"+block.shape[shapeIndexX][shapeIndexY]);
        if (block.shape[shapeIndexX][shapeIndexY] === 1){
          gridData[x][y] = block.color;
        }
        shapeIndexY++;
      };
      shapeIndexX++;
    };
    return gridData;
  },
  render: function(){
    return (
      <div className="gameboard">
        {
          this.state.gridData.map(function(cols, colsIndex){
            return (
              <div className="column">
                {cols.map(function(rows, rowsIndex){
                  return (
                    <Cell key={colsIndex+","+rowsIndex} color={rows}></Cell>
                  )
                })}
              </div>
            )
          })
        }
      </div>
    );
  }
})