'use strict';

var assert = require('assert');
var Dynatrace = require('../dynatrace');

describe('Synthetic', function() {
	
	var synthetic = new Dynatrace.Synthetic({
		username: process.env.DYNATRACE_USERNAME,
		password: process.env.DYNATRACE_PASSWORD
	});
	/*
	it('should...', function() {
		
		assert.equal(typeof synthetic.testsList, 'function');
		assert.equal(typeof synthetic.scriptsList, 'function');
		
	});

	describe('tests', function() {
		
		it('should return an array of tests', function(done) {
			
			synthetic.testsList({}, function(err, tests, res) {
				if (err) throw err;
				
				assert.equal(typeof tests, 'object');
				done();
			});
			
		});
		
	});

	describe('scripts', function() {
		
		it('should return a list of tests', function(done) {
			
			synthetic.scriptsList({}, function(err, body, res) {
				if (err) throw err;
				
				assert.equal(typeof body, 'object');
				done();
			});
			
		});
		
	});
*/
	describe('data', function() {
		
		it('should have function to retrieve data', function(done) {
			
			assert.equal(typeof synthetic.data, 'function');
			
		});
		
		it('should return results data object', function(done) {
			var params = { 
				iMonitorIdSet: ['18317263'],
				sMonitorClassDesignator: 'BROWSERTX',
				sDataDesignator: 'PAGE',
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