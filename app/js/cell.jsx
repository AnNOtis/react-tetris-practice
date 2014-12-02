'user strict'
var React = require('react')
module.exports = React.createClass({
  displayName: 'Cell',
  render: function(){
    var color = this.props.color
    var style = {
      boxSizing: "border-box",
      width: "20px",
      height: "20px",
      border: "1px solid #999"
    };
    style["width"]  = "20px";
    style["heigth"] = "20px";
    if( color !== 0){
      style["backgroundColor"] = color;
      style["boxSizing"] = "border-box";
    }
    return (
      <div className="cell" style={style}>

      </div>
    );
  }
})