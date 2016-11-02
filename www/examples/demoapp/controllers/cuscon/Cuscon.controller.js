/*
 * 
 * UI5Strap Demo App
 *
 * com.ui5strap.apps.demoapp.controllers.NewPost
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

sap.ui.define(['ui5strap/Controller'], function(Controller){

	var controllerImpl = {
			handleTap : function(oEvent){
				var con = this.getView().byId("testContainer");
				con.setOptions(["RedBox", "BorderBox"]);
				
				var p = this.getView().byId('testParagraph');
				p.setText(this.getApp().getLocaleString("TEST", 12));
			},
			
			onInit : function(oEvent){
				
				console.log("View initialized: " + this.getView().getId());
			},
			
			onAfterRendering : function(oEvent){
				
				console.log("View rendered: " + this.getView().getId());
			},
			
			onPageUpdate : function(oEvent){
				console.log("Owner", this.getOwnerComponent());
				console.log("On page update: " + this.getView().getId());
			},
			
			onPageShow : function(oEvent){
				console.log("On page show: " + this.getView().getId());
			},
			
			onPageHide : function(oEvent){
				console.log("On page hide: " + this.getView().getId());
			},
			
			onPageShown : function(oEvent){
				console.log("On page shown: " + this.getView().getId());
			},
			
			onPageHidden : function(oEvent){
				console.log("On page hidden: " + this.getView().getId());
			}
	};
	
	//Return Module Constructor
	return Controller.extend("com.ui5strap.apps.demoapp.controllers.cuscon.Cuscon", controllerImpl);

});