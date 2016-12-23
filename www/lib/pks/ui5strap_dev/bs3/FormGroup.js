/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.FormGroup
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

sap.ui.define(['./library', "../core/ControlBase"], function(ui5strapBs3Lib, ControlBase){
	
	"use strict";
	
	/**
	 * Constructor for a new FormGroup instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap form groups.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.FormGroup
	 * 
	 */
	var FormGroup = ControlBase.extend("pks.ui5strap.bs3.FormGroup", /** @lends pks.ui5strap.bs3.FormGroup.prototype */ {
		metadata : {

			defaultAggregation : "controls",
			
			library : "pks.ui5strap.bs3",

			properties : { 
				severity : {
					type:"pks.ui5strap.bs3.FormSeverity", 
					defaultValue:ui5strapBs3Lib.FormSeverity.None
				},
				label : {
					type:"string", 
					defaultValue:""
				},
				feedback : {
					type:"boolean",
					defaultValue : false
				},
				labelExtraSmall : {
					type:"int", defaultValue:0
				},
				labelSmall : {
					type:"int", defaultValue:0
				},
				labelMedium : {
					type:"int", defaultValue:0
				},
				labelLarge : {
					type:"int", defaultValue:0
				}
			},
			aggregations : { 
				controls : {
					multiple : true,
					singularName : "control"
				}
			}

		},
		
		renderer : function(rm, oControl) {
			var label = oControl.getLabel(),
				formControls = oControl.getControls();

			if(formControls.length === 0){
				throw new Error('You need to define at least one formControl.');
			}

			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			if(label){
				rm.write("<label");
				rm.addClass("control-label");
				rm.writeAttribute('for', formControls[0].getId());

				var columsMedium = oControl.getLabelMedium(),
						columsLarge = oControl.getLabelLarge(),
						columsSmall = oControl.getLabelSmall(),
						columsExtraSmall = oControl.getLabelExtraSmall();

					if(0 !== columsMedium){
						rm.addClass("col-md-" + columsMedium);
					}
					if(0 !== columsLarge){
						rm.addClass("col-lg-" + columsLarge);
					}
					if(0 !== columsSmall){
						rm.addClass("col-sm-" + columsSmall);
					}
					if(0 !== columsExtraSmall){
						rm.addClass("col-xs-" + columsExtraSmall);
					}
				

				rm.writeClasses();
				rm.write(">");
				rm.writeEscaped(label);
				rm.write("</label>");
			}

			for(var i = 0; i < formControls.length; i++){ 
				var formControl = formControls[i];
				rm.renderControl(formControl);
			}
			
			rm.write("</div> ");
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.FormGroup.prototype
	 */
	FormGroupProto = FormGroup.prototype;
	
	var _severityToClass = {
		Success : "success",
		Warning : "warning",
		Error : "error"
	};
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	FormGroupProto._getStyleClassPrefix = function(){
		return "ui5strapFormGroup";
	};
	
	FormGroupProto._getStyleClassDesign = function(){
		var styleClass = " form-group",
			severity = this.getSeverity();
		
		
		if(ui5strapBs3Lib.FormSeverity.None !== severity){
			styleClass += " has-" + _severityToClass[severity];
		}
		
		if(this.getFeedback()){
			styleClass += " has-feedback";
		}
		
		return styleClass;
	};

	return FormGroup;
});