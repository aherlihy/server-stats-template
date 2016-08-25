const StateMixin = require('reflux-state-mixin');
const Reflux = require('reflux');
const DataService = require('mongodb-data-service');
const connection = require('./connection');
const Actions = require('../actions');
const debug = require('debug')('server-stats:server-stats-store');

/**
 * Server Stats store.
 */

const ServerStatsStore = Reflux.createStore({
  /**
   * adds a state to the store, similar to React.Component's state
   * @see https://github.com/yonatanmn/Super-Simple-Flux#reflux-state-mixin
   */
  mixins: [StateMixin.store],

  init() {
    this.dataService = new DataService(connection);
    this.dataService.connect(() => {
      this.listenTo(Actions.pollServerStats, this.serverStats);
    });
  },

  serverStats() {
    this.dataService.serverstats((error, doc) => {
      this.setState({error: error, doc: doc});
    });
  },

  /**
   * Initialize the Server Stats store state.
   *
   * @return {Object} initial store state.
   */
  getInitialState() {
    return {
      error: null,
      doc: {}
    };
  },

  /**
   * log changes to the store as debug messages.
   * @param  {Object} prevState   previous state.
   */
  storeDidUpdate(prevState) {
    // debug('ServerStats store changed from %j to %j', prevState, this.state);
  }
});

module.exports = ServerStatsStore;
