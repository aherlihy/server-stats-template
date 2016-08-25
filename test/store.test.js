const expect = require('chai').expect;
const ServerStatsStore = require('../lib/stores');

describe('ServerStatsStore', function() {
  beforeEach(function() {
    // reset the store to initial values
    ServerStatsStore.setState(ServerStatsStore.getInitialState());
  });

  it('should have an initial state of {status: \'enabled\'}', function() {
    expect(ServerStatsStore.state.status).to.be.equal('enabled');
  });

  describe('toggleStatus()', function() {
    it('should switch the state to {status: \'disabled\'}', function() {
      ServerStatsStore.toggleStatus();
      expect(ServerStatsStore.state.status).to.be.equal('disabled');
    });

    it('should switch the state back to {status: \'enabled\'} when used a second time', function() {
      ServerStatsStore.toggleStatus();
      ServerStatsStore.toggleStatus();
      expect(ServerStatsStore.state.status).to.be.equal('enabled');
    });
  });
});
