var request = require('request');
var xml2js = require('xml2js');

/**
 * Creates an instance of Client
 *
 * @constructor
 * @this {Client}
 */
var Client = function() {
	
	this._xmlBuilder = new xml2js.Builder();
	this._xmlParser = xml2js.parseString;
	
};


Client.prototype.request = function(options, callback) {
	
	var self = this;
	options = options || {};

	// Add SOAP headers to request body
	var xml = {
		'soap12:Envelope': {
			'$': {
				'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
				'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
				'xmlns:soap12': 'http://www.w3.org/2003/05/soap-envelope'
			},
			'soap12:Header': {},
			'soap12:Body': options.soapBody
		}
	};

	var reqOptions = {
		url: options.url,
		method: 'POST',
		headers: {
			'Content-Type': 'application/soap+xml; charset=utf-8'
		},
		body: this._xmlBuilder.buildObject(xml)
	};
	
	return request(reqOptions, function(err, res, body) {
		
		if (err || !body) return callback(err, body, res);

		if (options.parseSOAP) {
			self._xmlParser(body, { explicitArray: false, mergeAttrs: true }, function(err, result) {	
				if (err && callback) return callback(err, body, res);
			
				// remove SOAP headers from body
				try {
					body = result['soap:Envelope']['soap:Body'];
				} catch(e) {}
			
				if (callback) return callback(err, body, res);
			});
		} else {
			return callback(null, body, res);
		}
	});

};

module.exports = Client;