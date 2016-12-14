/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.JsAlertTask
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

sap.ui.define(["./library", "../viewer/Task"], function(ui5strapTaskLib, ActionModule){
	
	"use strict";
	
	var AMJsAlert = ActionModule.extend("pks.ui5strap.task.JsAlertTask"),
	/**
	 * @alias pks.ui5strap.task.JsAlertTask.prototype
	 */
		AMJsAlertProto = AMJsAlert.prototype;

	/*
	* @Override
	*/
	AMJsAlertProto.parameters = {
		"message" : {
			"required" : true,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMJsAlertProto.run = function(){
		alert(this.getParameter('message'));
		
		this.then();
	};
	
	//Legacy
	AMJsAlertProto.completed = function(){};
	
	return AMJsAlert;
});