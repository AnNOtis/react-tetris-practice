'user strict'
var React = require('react')
module.exports = React.createClass({
  displayName: 'Cell',
  render: function(){
    var color = this.props.color
    var style = {};
    if( color !== 0){
      style["background-color"] = color;
      // style["border"] = "2px solid #333";
      style["box-sizing"] = "border-box";
    }
    return (
      <div className="cell" style={style}>

      </div>
    );
  }
})