/*
 * 
 * UI5Strap Server Library
 *
 * library.js
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

var nodeHttp = require('http'), nodeQuery = require('querystring'),
	nodeUrl = require('url'), nodeFs = require('fs'), nodePath = require('path'), nodeMime = require('mime');



/*
 * Server
 */
var Server = function(pathToConfig){
	this._pathToConfig = pathToConfig;
},
ServerProto = Server.prototype;

/**
 * @Public
 */
ServerProto.start = function(){
	var _this = this;
	
	nodeFs.readFile(this._pathToConfig, 'utf8', function(err, file) {
		if (err) {
			console.error("Could not load server.json!", err);
			return;
		}

		var serverConfig = JSON.parse(file);
		
		_this.config = serverConfig;
		_this._pathToWWW = serverConfig.server.pathToPublic;
		_this._port = serverConfig.server.port;
		_this._pathToApps = "../../apps/";
		_this._pathToAppsPublic = "/apps/";
		
		var apps = serverConfig.apps,
			cnr = apps.length;

		for(var i = 0; i < apps.length; i++){
			(function(){
				var appConfigUrl = apps[i].config,
					pathToAppConfig = nodePath.join(serverConfig.server.pathToPublic,
						appConfigUrl);
				nodeFs.readFile(pathToAppConfig, 'utf8', function(err, file) {
					if (err) {
						console.error("Could not load app config from '" + pathToAppConfig + "'!");
						return;
					}
					
					cnr --;
		
					var appConfig = JSON.parse(file),
						appServerId = appConfig.app.id + ".server";
					
					var sappUrlParts = appConfigUrl.split('/');
					sappUrlParts[sappUrlParts.length - 1] = '';
					var appConfigLocation = sappUrlParts.join('/');
					
					for(var j=0; j < appConfig.components.length; j++){
						var component = appConfig.components[j],
							controllerDef = component.restController;
						if(controllerDef && 0 === controllerDef.indexOf(appServerId)){
							var rest = controllerDef.substring(appServerId.length).replace(/\./g, "/") + ".controller.js";
							console.log("Loaded Controller '" + controllerDef + "' from '" + pathToAppConfig + "'.");
				
							var Controller = require(nodePath.join(_this._pathToApps, "demoapp/" + rest));
							//ui5strap.demoapp.server
							var controller = new Controller(component, appConfigLocation);
							controller._install();
						}
					}
		
					if(cnr === 0){
						_this.startUp();
					}
				});
			}());
		}
	});
};

/**
 * @Public
 */
ServerProto.startUp = function(){
	var _this = this;
	// Create a server
	this._nodeHttpServer = nodeHttp.createServer(function handleRequest(request, response) {
		var requestUrl = request.url;

		if (requestUrl === "/") {
			requestUrl = "/index.html";
		}

		var url = nodeUrl.parse(requestUrl, true);

		if (RestController.handleRequest(url, request, response)) {
			return;
		}

		var filename = nodePath.join(_this._pathToWWW, url.pathname);

		nodeFs.readFile(filename, function(err, file) {
			if (err) {
				response.writeHead(404);
				response.end('Not found');
				
				return;
			}
			response.writeHeader(200, {
				"Content-Type" : nodeMime.lookup(filename)
			});
			response.write(file, 'binary');
			response.end();
		});
	});

	// Lets start our server
	this._nodeHttpServer.listen(this._port, function() {
		// Callback triggered when server is successfully listening. Hurray!
		console.log("Server listening on: http://localhost:%s", _this._port);
	});
};


/*
 * Utils
 */

var Utils = function(){
	
};

/**
 * @Public
 * @Static
 */
Utils.hyphenize = function(str){
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/*
 * RestController
 */

var RestController = function(){};

/**
 * @Protected
 * @Static
 */
RestController.controllers = {};

/**
 * @Protected
 * @Static
 */
RestController._routing = [];

var _buildArguments = function(param){
	var args = [];
	if(!param.arguments){
		return args;
	}
	var postFormat = null;
	for(var j=0; j<param.arguments.length; j++){
		var p = param.arguments[j].split("."),
			key = p[0];
		
		if(key === "path"){
			if(!param.pathParameters){
				param.pathParameters = {};
			}
			args.push(param.pathParameters[p[1]]);
		}
		else if(key === "query"){
			if(!param.queryParameters){
				param.queryParameters = {};
			}
			args.push(param.queryParameters[p[1]]);
		}
		else if(key === "post"){
			if(postFormat === "payload"){
				throw new Error("Cannot read payload: post body has been interpreted as json!");
			}
			if(!param.postParameters){
				param.postParameters = nodeQuery.parse(param.postBody);
			}
			args.push(param.postParameters[p[1]]);
			
			postFormat = key;
		}
		else if(key === "payload"){
			if(postFormat === "post"){
				throw new Error("Cannot read payload: post body has been interpreted as url encoded!");
			}
			args.push(JSON.parse(param.postBody));
			
			postFormat = key;
		}
		else if(key === "success"){
			args.push(null);
		}
		else if(key === "error"){
			args.push(null);
		}
	}
	
	return args;
};


function processPost(request, response, callback) {
    var queryData = "";
    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            
            callback && callback(queryData);
        });

    } else {
        callback && callback(null);
    }
}

/**
 * @Public
 * @Static
 */
RestController.handleRequest = function(url, request, response){
	for(var i = 0; i < this._routing.length; i++){
		var routing = this._routing[i],
			matches = url.pathname.match(routing.route);
		
		
		if(matches && matches.length){
			console.log("Route '%s' matched with %s parameters.", routing.route, matches.length-1);
			var pathParam = {};
			if(matches.length > 1){
				for(var j = 0; j < routing.pathParameters.length; j++){
					pathParam[routing.pathParameters[j]] = matches[1 + j];
				}
			}
			response.writeHeader(200, {
				"Content-Type": "application/json"
			});
			
			//TODO beforeRequest handler
			var execMethod = routing.controller[routing.methodName];
			
			if(execMethod){
				processPost(request, response, function(body){
					var param = { 
							"arguments" : routing.methodOptions.arguments,
							"pathParameters" : pathParam,
							"queryParameters" : url.query
					};
					
					if(body){
						param.postBody = body;
					}
					
					var args = _buildArguments(param);
					
					response.end(JSON.stringify(execMethod.apply(routing.controller, args)));
				
				});
				//TODO afterRequest handler
				
				return true;
			}
			else{
				console.warn("Route '" + routing.route + "' matches but no method '" + routing.methodName + "' defined in controller.");
			}
		}
	}
	
	return false;
};

/**
 * Configure
 * @Protected
 */
RestController.prototype._configure = function(){};

/**
 * @Protected
 */
RestController.prototype._resolvePath = function(path){
	return nodePath.join(this.configLocation, path);
};

/**
 * @Protected
 */
RestController.prototype._install = function(){
	this._configure();
	
	var methods = this.options.methods;
	var methodKeys = Object.keys(methods);
	
	for(var i = 0; i < methodKeys.length; i++){
		var methodName = methodKeys[i],
			method = methods[methodName],
			path = nodePath.join(this._resolvePath(this.options.url), (method.path || Utils.hyphenize(methodName)));
		
		//if(method.type){
		if(path.charAt(0) !== "/"){
			path = "/" + path;
		}
		
		var pathParameters = [];
		var route = path.replace(/\{([a-zA-Z_0-9]+)\}/g, function(s, parameterName, x, y){
			//console.log(s, q, x, y);
			pathParameters.push(parameterName);
			return "([a-zA-Z_0-9]+)";
		});
		
		console.log("Registered method '" + methodName + "' on path '" + path + "'");
		RestController._routing.push({
				"route" : route,
				"pathParameters" : pathParameters,
				"controller" : this,
				"methodName" : methodName,
				"methodOptions" : method
		});
		//}
	}
	
	this.onInit();
};

/**
 * @Public
 */
RestController.prototype.onInit = function(){};

/*
 * Node Module Exports
 */
module.exports = {
	"Server" : Server,
	"RestController" : RestController,
	"Utils" : Utils,
	"restController" : function(controllerName, controllerImpl){
		var Controller = function(options, configLocation){
			this.configLocation = configLocation;
			this.options = options;
			
			if(controllerImpl){ 
				var implKeys = Object.keys(controllerImpl);
				for(var i = 0; i < implKeys.length; i++){
					this[implKeys[i]] = controllerImpl[implKeys[i]];
				}
			}
		};
		Controller.prototype = new RestController();
		return Controller;
	}
};