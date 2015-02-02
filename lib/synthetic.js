var async = require('async');
var Client = require('./client');
var _ = require('underscore');

/**
 * Creates an instance of Synthetic
 *
 * @constructor
 * @this {Synthetic}
 * @param		{object} options - 
 * @param		{string} options.username - 
 * @param		{string} options.password - 
 */
var Synthetic = function(options) {
	
	options = options || {};
	
	this.username = options.username;
	this.password = options.password;
	
	this._client = new Client();
	
};

/**
 * Synthetic.autheticate
 *
 * @desc Verifies if user has access to the account.
 *
 *
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Request object
 */
Synthetic.prototype.authenticate = function(callback) {
	
	var options = {
		url: 'http://gpn.webservice.gomez.com/accountmanagementws_20/AccountManagementWS.asmx',
		soapBody: {
			GSRAuthenticate: {
				'$': { xmlns: 'http://gomeznetworks.com/webservices/' },
				sUsername: this.username,
				sPassword: this.password
			}
		}
	};
	
	return this._client.request(options, callback);
	
};

/**
 * Synthetic.accountsShow
 *
 * @desc Shows account summary information.
 *
 *
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Request object
 */
Synthetic.prototype.accountsShow = function(callback) {
	
	var options = {
		url: 'http://gpn.webservice.gomez.com/accountmanagementws_20/AccountManagementWS.asmx',
		soapBody: {
			GetAccountSummary: {
				'$': { xmlns: 'http://gomeznetworks.com/webservices/' },
				sUsername: this.username,
				sPassword: this.password
			}
		}
	};
	
	return this._client.request(options, callback);
	
};

/**
 * Synthetic.nodesList
 *
 * @desc List backbone nodes available for an account.
 *
 *
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Request object
 */
Synthetic.prototype.nodesList = function(callback) {
	
	var options = {
		url: 'http://gpn.webservice.gomez.com/AccountManagementWS_20/AccountManagementWS.asmx',
		soapBody: {
			GetAccountSites: {
				'$': {
					xmlns: 'http://gomeznetworks.com/webservices/'
				},
				sUsername: this.username,
				sPassword: this.password
			}
		}
	};
	
	return this._client.request(options, callback);
};

/**
 * Synthetic.testsList
 *
 * @desc List tests for to which the user has access.
 *
 *
 * @param  {object} params - Parameters for API request
 * @param  {string} params.AgentType - 
 * @param  {string} params.QueryByCreateDate -
 * @param  {string} params.QueryByModifyDate -
 * @param  {integer} params.MonitorId -
 * @param  {integer} params.QueryByExpirationDate -
 * @param	 {string} params.MonitorStatus - 
 * @param	 {array} params.Group - 
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Request object
 */
Synthetic.prototype.testsList = function(params, callback) {
	
	params = params || {};
	var monitorClass = params.MonitorClass || '';
	
	// Remove monitorClass from params object
	if (params.MonitorClass) delete params.MonitorClass;

	var options = {
		url: 'http://gpn.webservice.gomez.com/TestManagementWS_30/TestManagementService.asmx',
		soapBody: {
			GetTestsExRequest: {
				'$': {
					xmlns: 'http://www.gomeznetworks.com/schemas/provisioning'
				},
				GetTestsRequest: {
					Credentials: {
						UserName: this.username,
						Password: this.password
					},
					MonitorFilter: params
				},
				MonitorClass: monitorClass
			}
		}
	};
	
	return this._client.request(options, callback);
};

/**
 * Synthetic.testsShow
 *
 * 
 *
 *
 * @param  {integer} id - 
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Request object
 */
Synthetic.prototype.testsShow = function(id, callback) {
	
	return this.testsList({ MonitorId: id }, callback);
	
};

/**
 * Synthetic.testsDestroy
 *
 * 
 *
 *
 * @param  {integer} id - 
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Request object
 */
Synthetic.prototype.testsDestroy = function(id, callback) {
	
	var options = {
		url: 'https://gpn.webservice.gomez.com/UtaScriptService/UtaScriptService.asmx',
		soapBody: {
			DeleteScript: {
				'$': {
					xmlns: 'http://gomeznetworks.com/webservices/'
				},
				sUsername: this.username,
				sPassword: this.password,
				iMonitorId: id
			}
		}
	};
	
	return this._client.request(options, callback);
	
};

/**
 * Synthetic.scriptsList
 *
 * @desc List scripts for to which the user has access.
 *
 *
 * @param		{object} params - Parameters for API request
 * @param		{string} params.AgentType -
 * @param		{integer} params.QueryByCreateDate - 
 * @param		{integer} params.QueryByModifyDate - 
 * @param		{integer} params.ScriptId -
 * @param		{callback} callback - The callback that handles the response.
 * @return	{object} Request object
 */
Synthetic.prototype.scriptsList = function(params, callback) {
	
	var options = {
		url: 'http://gpn.webservice.gomez.com/TestManagementWS_30/TestManagementService.asmx',
		soapBody: {
			GetScriptsRequest: {
				'$': {
					xmlns: 'http://www.gomeznetworks.com/schemas/provisioning'
				},
				Credentials: {
					UserName: this.username,
					Password: this.password
				},
				ScriptFilter: params
			}
		}
	};
	
	return this._client.request(options, callback);
	
};

/**
 * Synthetic.scriptsShow
 *
 * @desc		sd
 *
 *
 * @param		{integer} params.ScriptId -
 * @param		{callback} callback - The callback that handles the response.
 * @return	{object} Request object
 */
Synthetic.prototype.scriptsShow = function(id, callback) {
	
	return this.scriptsList({ ScriptId: id }, callback);
	
};

/**
 * Synthetic.scriptsDestroy
 *
 * @desc		sd
 *
 *
 * @param		{integer} params.ScriptId -
 * @param		{callback} callback - The callback that handles the response.
 * @return	{object} Request object
 */
Synthetic.prototype.scriptsDestroy = function(id, callback) {
	
	return this.testsDestroy({ iMonitorId: id }, callback);
	
};

/**
 * Synthetic.data
 *
 * @desc List scripts for to which the user has access.
 *
 *
 * @param		{object} params - Parameters for API request
 * @param		{array} params.iMonitorIdSet - Requested set of the Dynatrace Synthetic platform Monitor/Test reference Identifiers.
 * @param		{array} params.iSiteIdSet - Requested set of the Dynatrace Synthetic platform Site reference Identifiers.
 * @param		{string} params.sMonitorClassDesignator - Specifies the type of data to be exported in the dataset based on the common class of tests.
 * @param		{string} params.sDataDesignator - Specifies the levels of data in the dataset returned to the client for the type of data specified.
 * @param		{string} params.sLastN - Indicates a window based on the last N test samples relative to the current time.
 * @param		{string} params.sStartTime - Specifies the starting time boundary for the dataset. The format is: YYYY-MM-DD HH:MM:SS
 * @param		{string} params.sEndTime - Specifies the ending time boundary for the dataset. The format is: YYYY-MM-DD HH:MM:SS
 * @param		{string} params.sOrderDesignator - Specifies how the dataset will be ordered.
 * @param		{string} params.sTimeDesignator - Designation indicating how the time filters and modes are to be applied.
 * @param		{callback} callback - The callback that handles the response.
 * @return	{object} Request object
 */
Synthetic.prototype.data = function(params, callback) {
	
	var self = this;
	var sessionToken;
	var request;
	
	async.series({
		openDataFeed: function(cb) {
			request = self._openDataFeed(params, function(err, body) {
				if (err) cb(err, null);
				
				try {
					sessionToken = body.OpenDataFeed3Response.GpnOpenUtaDataFeedResponse.SessionToken;
				} catch(e) {
					return cb(err, null);
				}
				
				cb(null, sessionToken);
			});
		},
		getResponseData: function(cb) {
			self._getResponseData(sessionToken, function(err, body) {
				if (err) cb(err, null);
				
				cb(null, body);
			});
		},
		closeDataFeed: function(cb) {
			self._closeDataFeed(sessionToken);
			cb(null, null);
		}
	},
	function(err, results) {
		if (err) callback(err);
		
		callback(null, results.getResponseData);
	});
	
	return request;
	
};

/**
 * Synthetic._openDataFeed
 *
 * @desc		aldjfladf
 * @private
 *
 * @param		{object} params - 
 * @param		{callback} callback - The callback that handles the response.
 * @return	{object} Request object
 */
Synthetic.prototype._openDataFeed = function(params, callback) {
	
	params = params || {};
	
	if (params.iMonitorIdSet) {
		params.iMonitorIdSet = {
			int: params.iMonitorIdSet
		};
	}
	
	if (params.iSiteIdSet) {
		params.iSiteIdSet = {
			int: params.iSiteIdSet
		};
	}
	
	var soapBody = {
		OpenDataFeed3: {
			'$': {
				xmlns: 'http://gomeznetworks.com/webservices/'
			},
			sUsername: this.username,
			sPassword: this.password
		}
	};
	
	// merge params with soap body
	soapBody.OpenDataFeed3 = _.extend(soapBody.OpenDataFeed3, params);
	
	var options = {
		url: 'http://gpn.webservice.gomez.com/DataExportService60/GPNDataExportService.asmx',
		soapBody: soapBody
	};
	
	return this._client.request(options, callback);
};

/**
 * Synthetic._getResponseData
 *
 * @desc adfadf
 * @private
 *
 * @param		{string} sessionToken - 
 * @param		{callback} callback - The callback that handles the response.
 * @return	{object} Request object
 */
Synthetic.prototype._getResponseData = function(sessionToken, callback) {

	var options = {
		url: 'http://gpn.webservice.gomez.com/DataExportService60/GPNDataExportService.asmx',
		soapBody: {
			GetResponseData: {
				'$': {
					xmlns: 'http://gomeznetworks.com/webservices/'
				},
				sSessionToken: sessionToken
			}
		}
	};
	
	return this._client.request(options, callback);
	
};

/**
 * Synthetic._closeDataFeed
 *
 * @desc adfadsf
 * @private
 *
 * @param		{string} sessionToken - 
 * @param		{callback} callback - The callback that handles the response.
 * @return	{object} Request object
 */
Synthetic.prototype._closeDataFeed = function(sessionToken, callback) {
	
	var options = {
		url: 'http://gpn.webservice.gomez.com/DataExportService60/GPNDataExportService.asmx',
		soapBody: {
			CloseDataFeed: {
				'$': {
					xmlns: 'http://gomeznetworks.com/webservices/'
				},
				sSessionToken: sessionToken
			}
		}
	};
	
	return this._client.request(options, callback);
	
};
/*
Synthetic.prototype.alertsList = function(params, callback) {

	params = params || {};
	params.monitorType = params.monitorType || 'ALL';

	if (params.monitorType === 'PRIVATEPEER' || params.monitorType === 'MOBILE') {
		return this._lmAlertsList(params, callback);
	} else {
		return this._bbAlertsList(params, callback);
	}
	
};

Synthetic.prototype._bbAlertsList = function(params, callback) {
	
	var options = {
		url: 'http://gpn.webservice.gomez.com/AlertManagementService20/AlertManagementWS.asmx',
		soapBody: {
			GetAlertHistory: {
				username: this.username,
				password: this.password
			}
		}
	};
	
	// merge params with soap body
	options.soapBody.GetAlertHistory = _.extend(options.soapBody.GetAlertHistory, params);
	
	return this._client.request(options, callback);
	
};

Synthetic.prototype._lmAlertsList = function(params, callback) {
	
	var options = {
		url: 'http://gpn.webservice.gomez.com/AlertManagementService20/AlertManagementWS.asmx',
		soapBody: {
			GetLMAlertHistory: {
				username: this.username,
				password: this.password
			}
		}
	};
	
	// merge params with soap body
	options.soapBody.GetLMAlertHistory = _.extend(options.soapBody.GetLMAlertHistory, params);
	
	return this._client.request(options, callback);
	
};
*/
module.exports = Synthetic;