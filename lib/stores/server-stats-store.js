'use strict';

var Reflux = require('reflux');
var DataService = require('mongodb-data-service');
var connection = require('./connection');
var Actions = require('../../../index').Actions;
// const debug = require('debug')('server-stats:server-stats-store');

var ServerStatsStore = Reflux.createStore({

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
      _this2.trigger(error, doc);
    });
  }
});

module.exports = ServerStatsStore;