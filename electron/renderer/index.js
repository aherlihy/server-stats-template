require('babel-register')({ extensions: ['.jsx'] });

const React = require('react');
const ReactDOM = require('react-dom');
const OpCounterComponent = require('../../lib/components/opcounters-component');


ReactDOM.render(
  React.createElement(OpCounterComponent), document.getElementById('opCounterContainer')
);
