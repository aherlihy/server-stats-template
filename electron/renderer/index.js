require('babel-register')({ extensions: ['.jsx'] });

const React = require('react');
const ReactDOM = require('react-dom');

const ServerStatsComponent = require('../../lib/components');

ReactDOM.render(
  React.createElement(ServerStatsComponent), document.getElementById('container')
);
