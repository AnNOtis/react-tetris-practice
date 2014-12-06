'user strict'
var React = require('react')
module.exports = React.createClass({
  displayName: 'Dashboard',
  render: function(){
    return (
      <div className="dashboard">
        <div className="score">
          {this.props.score}
        </div>
      </div>
    );
  }
})