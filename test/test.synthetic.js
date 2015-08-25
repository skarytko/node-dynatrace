var assert = require('assert');
var dynatrace = require('../lib/dynatrace');

describe('Synthetic', function() {
	
	/*
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
	*/

	describe('tests', function(done) {
		this.timeout(8000);
		
		var synthetic = dynatrace.synthetic({ 
			username: 'stefan.karytko', 
			password: 'G@mezps1' 
		});
	
		synthetic.authenticate().then(function() {

			return synthetic.monitors.list({ status: 'active' });

		}).then(function(result) {

			console.log(result);
			assert.equal(typeof result, 'object');
		
			done();

		}).fail(function(err) {

			console.log(err);
			throw err;

		});
		
	});

/*
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
	*/
	describe('data', function() {
		
		it('should return results data object', function(done) {
			this.timeout(8000);
			
			var params = {
				monitorIds: [ '18530476', '23359852', '23451778', '23451780', '23413603', '23413604', '23413605' ],
				detailLevel: 'test,w3c',
				start: 1440083778819,
				end: 1440083825452
			};
			
			var synthetic = dynatrace.synthetic({ 
				username: 'stefan.karytko', 
				password: 'G@mezps1' 
			});
			
			synthetic.authenticate().then(function() {
			
				return synthetic.tests.list(params);
			
			}).then(function(result) {
				console.log(result);
				assert.equal(typeof result, 'object');

				done();

			}).fail(function(err) {
				console.log(err);
				throw err;
				
			});
			
		});
		
	});

});