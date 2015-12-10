/*
 * 
 * UI5Strap
 *
 * ui5strap.task.Navigate
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

sap.ui.define(['../library', '../ActionModule'], function(library, ActionModule){

	var Navigate = ActionModule.extend("ui5strap.task.Navigate"),
		NavigateProto = ui5strap.task.Navigate.prototype;

	/**
	* @Override
	*/
	NavigateProto.namespace = "navigate";

	/**
	* @Override
	*/
	NavigateProto.parameters = {
		
		"FRAME_CONTROLLER" : {
			"required" : false,
			"type" : ["string", "object"],
			"defaultValue" : "frame"
		}

	};

	/**
	* Run the ActionModule
	* @override
	*/
	NavigateProto.run = function(){
			var frameController = this.getParameter("FRAME_CONTROLLER");
			
			if("string" === typeof frameController){
				frameController = this.context.app.components[frameController];
			}
			
			if(!(frameController instanceof ui5strap.AppFrame)){
				throw new Error("Cannot goto page: .FRAME_CONTROLLER must be an instance of ui5strap.AppFrame!");
			}
			
			var navContainer = this.context.app.getRootControl(),
				CONTROLS = this.context.action[this.namespace]["CONTROLS"];
			
			if(CONTROLS && ("navContainer" in CONTROLS)){
				navContainer = this.context.resolve(this, CONTROLS.navContainer, true);
			}
			
			if(!navContainer || !(navContainer instanceof ui5strap.NavContainer)){
				throw new Error("[ui5strap.Task.Navigate] Please provide a valid NavContainer instance in .CONTROLS.navContainer!");
			}
			
			var VIEWS = this.context.action[this.namespace]["VIEWS"],
				viewsKeys = Object.keys(VIEWS);
			for(var i = 0; i < viewsKeys.length; i++){
				frameController.navigateTo(navContainer, this.context.resolve(this, VIEWS[viewsKeys[i]]));
			}
	};

	//Return Module Constructor
	return Navigate;
});