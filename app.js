var dynatrace = require('./lib/dynatrace');

var synthetic = dynatrace.synthetic({ username: 'stefan.karytko', password: 'G@mezps1' });

synthetic.authenticate().then(function() {
	
	var params = {
		monitorId: 18530476,
		start: new Date().getTime() - (1000 * 60 * 60 * 1),
		end: new Date().getTime()
	};
	
	return synthetic.tests.list(params);
	
}).then(function(result) {
	console.log(result.QueryTime);
	
}).fail(function(err) {
	console.log(err);
});