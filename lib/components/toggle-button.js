'use strict';

var React = require('react');
var ToggleButton = React.createClass({
  displayName: 'ToggleButton',


  /**
   * Render ToggleButton.
   *
   * @returns {React.Component} the rendered component.
   */

  propTypes: {
    onClick: React.PropTypes.func,
    children: React.PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      children: 'Toggle'
    };
  },
  render: function render() {
    return React.createElement(
      'button',
      {
        className: 'server-stats-toggle-button',
        type: 'button',
        onClick: this.props.onClick
      },
      this.props.children
    );
  }
});

module.exports = ToggleButton;