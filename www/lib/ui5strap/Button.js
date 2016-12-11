/*
 * 
 * UI5Strap
 *
 * ui5strap.Button
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

sap.ui.define(['./library', "pks/ui5strap/core/ControlBase", 'pks/ui5strap/core/SelectableSupport', "pks/ui5strap/core/Utils", "./PositionSupport"], function(ui5strapBs3Lib, ControlBase, SelectableSupport, Utils, PositionSupport){
	
	"use strict";
	
	var mMetaData =  {
			interfaces : ["pks.ui5strap.core.IText", "pks.ui5strap.bs3.IInputGroupButton"],
			
			defaultAggregation : "content",
			library : "pks.ui5strap.bs3",
			
			properties : { 
				type : {
					type: "ui5strap.ButtonType", 
					defaultValue: ui5strap.ButtonType.Button
				},
				text : {
					type: "string", 
					defaultValue: ""
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.Default
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				}
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			events:{
				
				//TODO Rename 'tap' event to 'press' sometimes
		        "tap":{}
		    }

		};
	
	PositionSupport.meta(mMetaData);
	SelectableSupport.meta(mMetaData);
	
	/**
	 * Constructor for a new Button instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap Buttons.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Button
	 * 
	 */
	var Button = ControlBase.extend("ui5strap.Button", {
		metadata : mMetaData
	}),
	ButtonProto = Button.prototype;
	
	PositionSupport.proto(ButtonProto);
	SelectableSupport.proto(ButtonProto);
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonProto._getStyleClassDesign = function(){
		var type = this.getType(),
			styleClass = "";
		
		//Bootstrap classes
		if(type === ui5strap.ButtonType.Button || ui5strap.ButtonType.Block === type){
			styleClass += " btn";
			styleClass += " btn-" + ui5strap.BSSeverity[this.getSeverity()];
		    
			var size = this.getSize();
			if(ui5strap.Size.Default !== size){
				styleClass += ' btn-' + ui5strap.BSSize[size];
		    }

		    if(ui5strap.ButtonType.Block === type){
		    	styleClass += " btn-block";
			}
		}
		else if(type === ui5strap.ButtonType.Link){
			styleClass += " btn btn-link";
		}
		else if(type === ui5strap.ButtonType.Close || type === ui5strap.ButtonType.Icon){
			styleClass += " close";
		}
		
		return styleClass;
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonProto._getStyleClassRoot = function(){
		var type = this.getType(),
			styleClass = "";
		if(ui5strap.ButtonType.Default !== type){
			styleClass = " " + this._getStyleClassType(type);
		}
		return styleClass;
	};
	
	/**
	 * Setter for dynamic html tag attributes.
	 */
	Utils.dynamicAttributes(
		ButtonProto, 
		[
			"title"
		]
	);

	/**
	 * Setter for dynamic text.
	 */
	Utils.dynamicText(ButtonProto);

	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ButtonProto._handlePress = function(oEvent) {
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		oEvent.setMarked("pks.ui5strap.core.ISelectableItem");
		oEvent.setMarked("ui5strap.Button");
		
		if (this.getEnabled()) {
			//TODO
			/*
			if(this.getToggeable() && this.getSelectable()){
				this.setSelected(!this.getSelected());
				//TODO fire "toggle" event?
			}
			*/
			
			this.fireTap({});
		}
	};
	
	if(ui5strap.support.touch){	
		ButtonProto.ontap = ButtonProto._handlePress;
	}
	else{
		ButtonProto.onclick = ButtonProto._handlePress;
	}
	
	return Button;
});