'use strict';

const StateMixin = require('reflux-state-mixin');
const React = require('react');
const Actions = require('../actions');
const OpCounterStore = require('../stores/opcounters-store');
const Minichart = require('./minichart');
const debug = require('debug')('server-stats:opcounters-component');


/**
 * Represents the component that renders the serverStatus['opcounters'] information.
 */
const OpCountersComponent = React.createClass({

  mixins: [ StateMixin.connect(OpCounterStore) ],

  /**
   * When the component mounts, the component will subscribe to the
   * provided store, so that each time the store triggers the component
   * can update its state.
   */
  componentDidMount() {
    this.intervalId = setInterval(() => {
      Actions.pollServerStats();//TODO, call from here?
    }, 1000);
  },

  /**
   * When the component unmounts, we unsubscribe from the store and stop the
   * timer.
   */
  componentWillUnmount() {
    clearInterval(this.intervalId);
  },

  /**
   * Renders the component.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <div>
        {this.state.error ? this.renderError() : this.renderGraph()}
      </div>
    );
  },

  /**
   * Render the error message in the component.
   *
   * @returns {String} The error message.
   */
  renderError() {
    return this.state.error.message;
  },

  /**
   * Render the graph in the component.
   *
   */
  renderGraph() {
    return (
      <div className='opcounterschart'>
        <Minichart
          data={this.state.data}
          graph_type='stats-chart'
        />
      </div>
    );
  }

});

module.exports = OpCountersComponent;