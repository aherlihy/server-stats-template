'use strict';

const StateMixin = require('reflux-state-mixin');
const Reflux = require('reflux');
const ServerStatsStore = require('./server-stats-store');
const debug = require('debug')('server-stats:opcounter-store');

const OpCounterStore = Reflux.createStore({
  mixins: [StateMixin.store],

  init() {
    this.listenTo(ServerStatsStore, this.opCounter);
    this.opsPerSec = {
      'insert': [], 'query': [], 'update': [],
      'delete': [], 'command': [], 'getmore': []};
    this.maxOps = 63;
  },
  getInitialState() {
    this.rawData = [];
    this.localTime = [];
    this.currentMax = 1;
    this.starting = true;
    return {
      error: null,
      data: {'operations': [
        {'op': 'insert', 'count': [], 'active': true, 'current': 0},
        {'op': 'query', 'count': [], 'active': true, 'current': 0},
        {'op': 'update', 'count': [], 'active': true, 'current': 0},
        {'op': 'delete', 'count': [], 'active': true, 'current': 0},
        {'op': 'command', 'count': [], 'active': true, 'current': 0},
        {'op': 'getmore', 'count': [], 'active': true, 'current': 0}],
        'localTime': [],
        'yDomain': [0, 1],
        'rawData': [],
        'maxOps': 63,
        'labels': {
          'title': 'operations',
          'keys': ['inserts', 'queries', 'updates', 'deletes', 'commands', 'getmores'],
          'yAxis': 'OPS'}
      }
    };
  },

  opCounter(serverStats) {
    var error = serverStats.error;
    var doc = serverStats.doc;
    var data = _.cloneDeep(this.state.data);
      if (!error && doc) {
        var key;
        var val;
        var count;
        for (var q = 0; q < data.operations.length; q++) {
          key = data.operations[q].op;
          count = doc.opcounters[key];
          if (this.starting) { // don't add data, starting point
            data.operations[q].current = count;
            continue;
          }
          val = count - data.operations[q].current;
          this.opsPerSec[key].push(val);
          data.operations[q].count = this.opsPerSec[key].slice(Math.max(this.opsPerSec[key].length - this.maxOps, 0));
          if (val > this.currentMax) {
            this.currentMax = val;
          }
          data.operations[q].current = count;
        }
        if (this.starting) {
          this.starting = false;
          return;
        }
        this.rawData.push(doc.opcounters);
        data.yDomain = [0, this.currentMax];
        this.localTime.push(doc.localTime);
        data.localTime = this.localTime.slice(Math.max(this.localTime.length - this.maxOps, 0));
        data.rawData = this.rawData.slice(Math.max(this.rawData.length - this.maxOps, 0));
      }
      this.setState({error: error, data: data});
  }
});

module.exports = OpCounterStore;
