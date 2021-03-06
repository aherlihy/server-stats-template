const React = require('react');
const ToggleButton = React.createClass({

  /**
   * Render ToggleButton.
   *
   * @returns {React.Component} the rendered component.
   */

  propTypes: {
    onClick: React.PropTypes.func,
    children: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      children: 'Toggle'
    };
  },

  render() {
    return (
        <button
          className="server-stats-toggle-button"
          type="button"
          onClick={this.props.onClick}
        >{this.props.children}</button>
    );
  }
});


module.exports = ToggleButton;
