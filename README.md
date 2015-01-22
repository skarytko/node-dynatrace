# node-dynatrace
Dynatrace API client library for Node.js

## Installation
This library is distributed on npm. In order to intall this node module, run the following command:

```
npm install dynatrace --save
```

## Usage
```js
var Dynatrace = require('dynatrace');

var synthetic = new Dynatrace.Synthetic({ username: 'user1234', password: 'password1234' });

synthetic.getTests({}, function(err, results) {
	console.log('Result:' + ((err) ? err.message : results.GetTestsResponse.Monitors.Monitor[0].name));
});
```
## License
MIT