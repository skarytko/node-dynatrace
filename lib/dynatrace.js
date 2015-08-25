var SyntheticREST = require('./synthetic/rest/synthetic');

module.exports = {
	
	Synthetic: require('./synthetic/synthetic'),
	
	synthetic: function(options) {
		
		options = options || {};
		options.version = options.version || 'rest';
		
		var version = options.version;

		delete options.version;
		
		if (version === 'soap') {
			return new this.Synthetic(options);
		} else {
			return new SyntheticREST(options);
		}

	}
	
};