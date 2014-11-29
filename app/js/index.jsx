'use strict'
var React = require('react')
var Tetris = require('./tetris')
require("./../css/tetris.scss");

React.renderComponent(<Tetris />, document.getElementById('content'))
