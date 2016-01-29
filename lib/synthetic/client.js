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
	var xml = {};
	var headers = {};
	
	options = options || {};

	if (options.bodyType === 'soap') {
		xml = options.body;
	} else {
		// Add SOAP headers to request body
		xml = {
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
	}

	if (options.headers) {
		headers = options.headers;
	} else {
		headers = {'Content-Type': 'application/soap+xml; charset=utf-8' };
	}

	var reqOptions = {
		url: options.url,
		method: 'POST',
		headers: headers,
		body: this._xmlBuilder.buildObject(xml)
	};
	
	return request(reqOptions, function(err, res, body) {
		
		if (err || !body) return callback(err, body, res);

		self._xmlParser(body, { explicitArray: false, mergeAttrs: true }, function(err, result) {	
			if (err) return callback(null, body, res);
		
			// remove SOAP headers from body
			try {
				var base = result;
				
				if (options.response.parse) {
					var contentPath = options.response.contentPath.split('/');

					// traverse xml object
					contentPath.forEach(function(node) {
						base = base[node];
					});
				} else {
					base = result['soap:Envelope']['soap:Body'];
				}

				return callback(null, base, res);
			} catch(e) {
				return callback(null, result, res);
			}
		});

	});

};

module.exports = Client;