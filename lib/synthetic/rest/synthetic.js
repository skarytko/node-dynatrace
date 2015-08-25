var util = require('util');
var RestClient = require('../rest_client');
var loadResources = require('./api');


var Synthetic = function(options) {
	
	Synthetic.super_.call(this, options);
		
	this.username = options.username;
	this.password = options.password;
	this.accessToken = null;
	
	// load api resources
	loadResources(this);
		
};

util.inherits(Synthetic, RestClient);

module.exports = Synthetic;