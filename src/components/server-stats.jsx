const React = require('react');
const StateMixin = require('reflux-state-mixin');
const ServerStatsStore = require('../stores');
const ServerStatsActions = require('../actions');
const ToggleButton = require('./toggle-button');

// const debug = require('debug')('mongodb-compass:server-stats');

const ServerStatsComponent = React.createClass({
  /**
   * automatically subscribe/unsubscribe to changes from the store.
   */
  mixins: [ StateMixin.connect(ServerStatsStore) ],

  onClick() {
    ServerStatsActions.toggleStatus();
  },

  /**
   * Render RefluxCapacitor.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="server-stats">
        <h2 className="server-stats-title">ServerStatsComponent</h2>
        <p><i>Compass component to visualize server-stats</i></p>
        <p>This component is connected to a reflux store. It contains a <code>
          &lt;ToggleButton/&gt;</code> component (below) that triggers
          a <code>toggleStatus()</code> action, which changes
          the store's state and causes the component to re-render.
        </p>
        <p>The current status is: <code>{this.state.status}</code></p>
        <ToggleButton onClick={this.onClick} />
      </div>
    );
  }
});


module.exports = ServerStatsComponent;
