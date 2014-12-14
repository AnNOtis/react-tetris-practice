'user strict'
var React = require('react')
module.exports = React.createClass({
  displayName: 'Cell',
  render: function(){
    var color = this.props.color
    var style = {

    };
    if( color !== 0){
      style["backgroundColor"] = color;
      style["boxShadow"] = "0 0 0 2px #333";
    }
    return (
      <div className="cell" style={style}>

      </div>
    );
  }
})