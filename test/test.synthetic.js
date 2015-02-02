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
				console.log(JSON.stringify(result));
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
		
	});
	/*
	describe('alerts', function() {
		
		it('should return a list of alerts', function(done) {
			
			var params = {
				monitorType: 'ALL',
				startTime: '2013-01-22 00:00:00',
				endTime: '2013-01-23 00:00:00'
			};
			
			synthetic.alertsList(params, function(err, body, res) {
				if (err) throw err;

				assert.equal(typeof body, 'object');
				done();
			});
			
		});
		
	});
	*/
	describe('data', function() {
		
		it('should return results data object', function(done) {
			this.timeout(8000);
			
			var params = { 
				iMonitorIdSet: ['18317263'],
				sMonitorClassDesignator: 'BROWSERTX',
				sDataDesignator: 'SUMMARY',
				sOrderDesignator: 'TIME',
				sStartTime: '2015-01-20 00:00:00', 
				sEndTime: '2015-01-20 12:00:00'
			};
			
			synthetic.data(params, function(err, body, res) {
				if (err) throw err;
				
				assert.equal(typeof body, 'object');
				done();
			});
			
		});
		
	});

});