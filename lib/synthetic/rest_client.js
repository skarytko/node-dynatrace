var path = require('path');
var querystring = require('querystring');
var url = require('url');
var _ = require('underscore');

var Q = require('q');
var format = require('string-template');
var request = require('request');

var Client = function(options) {
	
	this.options = options || {};
	
	this.host = options.host;
	this.basePath = options.basePath;
	
};

Client.prototype.resourceRequest = function(options, callback) {
	
	var self = this;
	var requestOptions = {};
	
	options = options || {};
	
	var params = options.params || {};
	var urlParams = options.urlParams || {};
	
	// set method
	requestOptions.method = options.method || 'GET';
	
	// set headers
	requestOptions.headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authentication': 'bearer ' + this.accessToken
	};
	
	if (options.headers) _.extend(requestOptions.headers, options.headers);

	// format url
	var uri = url.format({
		protocol: this.protocol,
		host: this.host,
		pathname: path.join(this.basePath, options.resource)
	});
	
	requestOptions.url = format(uri, params);
	requestOptions.body = options.body;

	// remove url params from params
	for (var param in urlParams) {
		delete params[param];
	}
	
	requestOptions.qs = params;
	
	return this.request(requestOptions, callback);
	
};


Client.prototype.request = function(options, callback) {
	
	var deferred = Q.defer();
	
	request(options, function(err, res, body) {

		try {
			body = JSON.parse(body);
		} catch(e) { /* non-json response */}
		
		if (body && res.statusCode > 299) {
			err = new Error(body.message);
			err.code = res.statusCode;
			
			body = null;
		}
		
		// Resolve promise
    if (err) {
			deferred.reject(err);
    } else {
			deferred.resolve(body);
    }
	});

	return deferred.promise.nodeify(callback);
	
};

module.exports = Client;