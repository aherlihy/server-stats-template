const app = require('ampersand-app');
const ServerStatsComponent = require('./lib/components');
const ServerStatsActions = require('./lib/actions');
const ServerStatsStore = require('./lib/stores');

/**
 * Activate all the components in the Server Stats package.
 */
function activate() {
  app.appRegistry.registerComponent('Instance:ServerStats', ServerStatsComponent);
  app.appRegistry.registerAction('ServerStatsActions', ServerStatsActions);
  app.appRegistry.registerStore('ServerStatsStore', ServerStatsStore);
}

/**
 * Deactivate all the components in the Server Stats package.
 */
function deactivate() {
  app.appRegistry.deregisterComponent('Instance:ServerStats');
  app.appRegistry.deregisterAction('ServerStatsActions');
  app.appRegistry.deregisterStore('ServerStatsStore');
}

module.exports = ServerStatsComponent;
module.exports.activate = activate;
module.exports.deactivate = deactivate;
