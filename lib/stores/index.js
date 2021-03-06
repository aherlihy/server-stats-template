'use strict';

var StateMixin = require('reflux-state-mixin');
var Reflux = require('reflux');
var DataService = require('mongodb-data-service');
var connection = require('./connection');
var Actions = require('../../../index').Actions;
// const debug = require('debug')('server-stats:server-stats-store');

var debug = require('debug')('mongodb-compass:stores:server-stats');

/**
 * Server Stats store.
 */

var ServerStatsStore = Reflux.createStore({
  /**
   * adds a state to the store, similar to React.Component's state
   * @see https://github.com/yonatanmn/Super-Simple-Flux#reflux-state-mixin
   */
  mixins: [StateMixin.store],
  //
  // /**
  //  * listen to all actions defined in ../actions/index.jsx
  //  */
  // listenables: ServerStatsActions,

  init: function init() {
    var _this = this;

    this.dataService = new DataService(connection);
    this.dataService.connect(function () {
      _this.listenTo(Actions.pollServerStats, _this.serverStats);
    });
  },
  serverStats: function serverStats() {
    var _this2 = this;

    this.dataService.serverstats(function (error, doc) {
      _this2.setState({ error: error, data: doc });
    });
  },


  /**
   * Initialize the Server Stats store state.
   *
   * @return {Object} initial store state.
   */
  getInitialState: function getInitialState() {
    return {
      error: null,
      data: {}
    };
  },


  /**
   * log changes to the store as debug messages.
   * @param  {Object} prevState   previous state.
   */
  storeDidUpdate: function storeDidUpdate(prevState) {
    debug('ServerStats store changed from %j to %j', prevState, this.state);
  }
});

module.exports = ServerStatsStore;