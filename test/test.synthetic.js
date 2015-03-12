var assert = require('assert');
var Dynatrace = require('../dynatrace');

describe('Synthetic', function() {
	
	var synthetic = new Dynatrace.Synthetic({
		username: process.env.DYNATRACE_USERNAME,
		password: process.env.DYNATRACE_PASSWORD
	});
	
	describe('account', function() {
		
		it('should return an object confirming authentication', function(done) {
			
			synthetic.authenticate(function(err, result, res) {
				if (err) throw err;
				
				assert.equal(typeof result, 'object');
				done();
			});
			
		});
		
		it('should return an object with account summary information', function(done) {
			
			synthetic.accountsShow(function(err, result, res) {
				if (err) throw err;
				
				assert.equal(typeof result, 'object');
				done();
			});
			
		});
		
	});
	
	describe('locations', function() {
		
		it('should return an array of backbone nodes', function(done) {
			
			synthetic.nodesList(function(err, result, res) {
				if (err) throw err;
				
				assert.equal(typeof result, 'object');
				done();
			});
			
		});
		
	});
	

	describe('tests', function() {
		this.timeout(8000);
		
		it('should return an array of tests', function(done) {
			
			synthetic.testsList({}, function(err, tests, res) {
				if (err) throw err;

				assert.equal(typeof tests, 'object');
				done();
			});
			
		});
		
	});

	describe('scripts', function() {
		
		it('should return a list of scripts', function(done) {
			this.timeout(8000);
			
			synthetic.scriptsList({}, function(err, body, res) {
				if (err) throw err;
				
				assert.equal(typeof body, 'object');
				done();
			});
			
		});
		
		it('should download a script', function(done) {
			
			var scriptId = 10759004;
			
			synthetic.scriptsDownload({ iMonitorId: 10759004 }, function(err, body, res) {
				if (err) throw err;
				
				assert.equal(typeof body, 'object');
				done();
			});
			
		});
		
		it('should return status', function(done) {
			this.timeout(8000);
			
			synthetic.scriptsDestroy(20544767, function(err, body, res) {
				if (err) throw err;

				assert.equal(typeof body, 'object');
				done();
			});
			
		});
		
	});
	
	describe('alerts', function() {
		
		it('should return a list of alerts', function(done) {
			
			var params = {
				endTime: new Date()
			};
			
			synthetic.alertsList(params, function(err, body, res) {
				if (err) throw err;

				assert.equal(typeof body, 'object');
				done();
			});
			
		});
		
	});
	
	describe('data', function() {
		
		it('should return results data object', function(done) {
			this.timeout(8000);
			
			var params = { iMonitorIdSet: [ '18408588', '18530476' ],
  sMonitorClassDesignator: 'BROWSERTX',
  sDataDesignator: 'SUMMARY',
  sOrderDesignator: 'TIME',
  sStartTime: '2015-02-03T00:26:49.909Z',
  sEndTime: '2015-02-03T00:31:49.910Z' };
			
			synthetic.data(params, function(err, body, res) {
				if (err) throw err;
				
				assert.equal(typeof body, 'object');
				done();
			});
			
		});
		
	});

});