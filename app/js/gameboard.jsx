'user strict'

React = require('react')
_ = require("underscore")
Cell = require('./cell')
key = require('./keymaster')
module.exports = React.createClass({
  displayName: "Gameboard",
  getInitialState: function() {
    return {
      gridData: this.generate2DArray(this.props.xSize, this.props.ySize),
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
            [1,1,1,1],
          ],
        color: "#007C97", //cyan
        position: [4,0]
      },
      J:{
        name:"J",
        shape:
          [

            [0,1],
            [0,1],
            [1,1]
          ],
        color: "#2676CD", //blue
        position: [4,1]
      },
      L:{
        name:"L",
        shape:
          [
            [1,0],
            [1,0],
            [1,1]
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

            [1,0],
            [1,1],
            [0,1]
          ],
        color: "#6FBF5D", //green
        position: [4,1]
      },
      T:{
        name:"T",
        shape:
          [

            [0,1,0],
            [1,1,1]
          ],
        color: "#BA88CE", //purple
        position: [4,1]
      },
      Z:{
        name:"Z",
        shape:
          [
            [0,1],
            [1,1],
            [1,0]
          ],
        color: "#CC4040", //red
        position: [4,1]
      }
    }
  },
  componentWillMount: function(){
    this.updateCurrentBlock();
  },
  componentDidMount: function(){
    this.state.dropInterval = setInterval(function() {
      this.drop()
    }.bind(this), 500);
    key('up, down, left, right', this.handleKeyDown);
  },
  generate2DArray: function(xSize, ySize){
    var grid = new Array(xSize)
    for (var x = 0; x <= xSize-1; x++) {
      grid[x] = new Array(ySize);
      for (var y = 0; y <= ySize-1; y++) {
        grid[x][y] = 0
      };
    };
    return grid;
  },
  randomBlock: function(){
    var blocks = ["I","J","L","O","S","T","Z"];
    var choose = Math.floor(Math.random()*(blocks.length-1));
    var resultBlock = this.props[blocks[choose]];
    var cloneBlock = {
      name: resultBlock.name,
      shape: _.map(resultBlock.shape, _.clone),
      position: _.map(resultBlock.position, _.clone),
      color: resultBlock.color
    }
    return cloneBlock;
  },
  updateCurrentBlock: function(){
    if(this.state.nextBlock === null){
      this.setState({
        currentBlock: this.randomBlock(),
        nextBlock: this.randomBlock()
      });
    }else{
      this.setState({
        currentBlock: this.state.nextBlock,
        nextBlock: this.randomBlock()
      });
    }
  },
  updateBlockPosition: function(){

  },
  updateRectangle: function(block){
    return {
      x1: block.position[0],
      x2: block.position[0] + block.shape[0].length-1,
      y1: block.position[1],
      y2: block.position[1] + block.shape.length-1,
    }
  },
  renderGrid: function(){
  },
  generateGridData: function (isStack) {
    var block = this.state.currentBlock;
    var range = this.updateRectangle(block);
    var gridData = isStack ? this.state.gridData : _.map( this.state.gridData, _.clone);

    var shapeIndexX = 0;
    for (var x = range.x1; x <= range.x2; x++) {
      var shapeIndexY = 0;
      for (var y = range.y1; y <= range.y2; y++) {
        // console.log(shapeIndexX+","+shapeIndexY+":"+block.shape[shapeIndexX][shapeIndexY]);
        if (block.shape[shapeIndexY][shapeIndexX] === 1){
          gridData[x][y] = block.color;
        }
        shapeIndexY++;
      };
      shapeIndexX++;
    };
    return gridData;
  },
  handleKeyDown: function(e,handler){
    var keymapping = {
      down:  [ 0, 1],
      left:  [-1, 0],
      right: [ 1, 0]
    };

    switch(handler.key){
      case 'up':
        this.rotateCurrentBlock();
        break;
      case 'down':
      case 'left':
      case 'right':
        var offset = keymapping[handler.key];
        this.move(offset[0],offset[1]);
        break;
    }
  },
  move: function(x,y){
    var block = this.state.currentBlock;
    var xPosition = block.position[0] + x;
    var yPosition = block.position[1] + y;
    if(this.meetEdge(xPosition, yPosition, block.shape) || this.meetStack( block.shape, xPosition, yPosition)){
      return false;
    }else{
      block.position[0] = xPosition;
      block.position[1] = yPosition;
      this.forceUpdate();
    }
  },
  drop: function(){
    var currentBlock = this.state.currentBlock;
    bottomEdge = currentBlock.position[1] + currentBlock.shape.length-1
    if( bottomEdge+1 > this.props.ySize-1
      || this.meetStack(currentBlock.shape, currentBlock.position[0], currentBlock.position[1]+1)){
      this.state.gridDate = this.generateGridData(true);
      this.updateCurrentBlock();
      if (currentBlock.position[1] == this.props[currentBlock.name].position[1]){
        clearInterval(this.state.dropInterval);
        alert("Game Over!!");
      }
    }else{
      currentBlock.position[1]++;
    }
    this.forceUpdate();
  },
  meetEdge: function(xPosition, yPosition, shape){
    var leftEdge, rightEdge, bottomEdge;
    for(var y = 0; y <= shape.length-1; y++){
      for(var x = 0; x <= shape[0].length-1; x++){
        if( (shape[y][x]===1 && leftEdge===undefined) || x<=leftEdge-xPosition ){
          leftEdge = xPosition+x;
        }
        if(shape[y][x]===1 && x>=rightEdge-xPosition || rightEdge===undefined){
          rightEdge = xPosition + x;
        }
        if(shape[y][x]===1 && y>=bottomEdge-yPosition || bottomEdge===undefined){
          bottomEdge = yPosition + y;
        }
      }
    }
    // console.log(leftEdge+","+rightEdge+","+bottomEdge);
    if(leftEdge<0 || rightEdge>this.props.xSize-1 || bottomEdge>this.props.ySize-1){
      return true;
    }else{
      return false;
    }
  },
  meetStack: function(shape, xPosition, yPosition){
    for(var y = 0; y <= shape.length-1; y++){
      for(var x = 0; x<= shape[0].length-1; x++){
        if(this.state.gridData[x+xPosition][y+yPosition]!==0 && shape[y][x]){
          console.log(x+xPosition);
          console.log(y+yPosition);
          console.log(shape);
          return true;
        }
      }
    }
    return false;
  },
  rotateCurrentBlock: function(){
    var block = this.state.currentBlock;
    var blockShape = block.shape;
    var rotatedBlockShape = this.generate2DArray( blockShape[0].length, blockShape.length);
    var queue = [];
    var queueIndex = 0;
    for(var y=0; y<=blockShape.length-1; y++){
      for(var x=0; x<=blockShape[0].length-1; x++){
        queue.push(blockShape[y][x]);
      }
    }
    for(var x=rotatedBlockShape[0].length-1; x>=0; x--){
      for(var y=0; y<=rotatedBlockShape.length-1; y++){
        rotatedBlockShape[y][x] = queue[queueIndex];
        queueIndex++;
      }
    }
    block.shape = rotatedBlockShape;
    this.forceUpdate();
  },
  render: function(){
    return (
      <div className="gameboard">
        {
          this.generateGridData().map(function(cols, colsIndex){
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