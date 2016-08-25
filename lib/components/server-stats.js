'use strict';

var React = require('react');
var StateMixin = require('reflux-state-mixin');
var ServerStatsStore = require('../stores');
var ServerStatsActions = require('../actions');
var ToggleButton = require('./toggle-button');

// const debug = require('debug')('mongodb-compass:server-stats');

var ServerStatsComponent = React.createClass({
  displayName: 'ServerStatsComponent',

  /**
   * automatically subscribe/unsubscribe to changes from the store.
   */
  mixins: [StateMixin.connect(ServerStatsStore)],

  onClick: function onClick() {
    ServerStatsActions.toggleStatus();
  },


  /**
   * Render RefluxCapacitor.
   *
   * @returns {React.Component} The rendered component.
   */
  render: function render() {
    return React.createElement(
      'div',
      { className: 'server-stats' },
      React.createElement(
        'h2',
        { className: 'server-stats-title' },
        'ServerStatsComponent'
      ),
      React.createElement(
        'p',
        null,
        React.createElement(
          'i',
          null,
          'Compass component to visualize server-stats'
        )
      ),
      React.createElement(
        'p',
        null,
        'This component is connected to a reflux store. It contains a ',
        React.createElement(
          'code',
          null,
          '<ToggleButton/>'
        ),
        ' component (below) that triggers a ',
        React.createElement(
          'code',
          null,
          'toggleStatus()'
        ),
        ' action, which changes the store\'s state and causes the component to re-render.'
      ),
      React.createElement(
        'p',
        null,
        'The current status is: ',
        React.createElement(
          'code',
          null,
          this.state.status
        )
      ),
      React.createElement(ToggleButton, { onClick: this.onClick })
    );
  }
});

module.exports = ServerStatsComponent;