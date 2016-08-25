'use strict';

var Reflux = require('reflux');

/**
 * The actions used by the server stats components.
 */
var Actions = Reflux.createActions(['pollCurrentOp', 'pollTop', 'pollServerStats']);

module.exports = Actions;