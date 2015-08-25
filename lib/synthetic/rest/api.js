var xml2js = require('xml2js');

module.exports = function(client) {
	
	client.protocol = client.protocol || 'https';
	client.host = client.host || 'datafeed-api.dynatrace.com';
	client.basePath = client.basePath || '/publicapi/rest/v1.0';
	
	client.authenticate = function(params, callback) {
		
		params = params || { user: client.username, password: client.password };
		
		var options = {
			resource: 'login',
			method: 'GET',
			params: params
		};

		return client.resourceRequest(options, callback).then(function(accessToken) {
			client.accessToken = accessToken;
		});
	};
	
	client.monitors = {
	
		list: function(params, callback) {
	
			var options = {
				resource: 'tests',
				method: 'GET',
				params: params,
			};

			return client.resourceRequest(options, callback);
		
		}
		
	};
	
	client.tests = {
	
		list: function(params, callback) {
			
			params.monitorIds = params.monitorIds || [];
				
			var xml = '<?xml version="1.0" ?><TESTDATA_INPUT><MonitorSet>';
			
			params.monitorIds.forEach(function(monitorId) {
				xml += '<Monitor><mid>' + monitorId + '</mid></Monitor>';
			});
			
			xml += '</MonitorSet></TESTDATA_INPUT>';

			delete params.monitorIds;

			var options = {
				resource: 'testresults',
				method: 'POST',
				params: params,
				body: xml
			};

			return client.resourceRequest(options, callback);

		}
	
	};
	
	client.sites = {
	
		list: function(params, callback) {
	
			var options = {
				resource: 'sites',
				method: 'GET',
				params: params
			};

			return client.resourceRequest(options, callback);

		}
	
	};
	
};