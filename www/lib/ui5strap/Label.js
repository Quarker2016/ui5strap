/*
 * 
 * UI5Strap
 *
 * ui5strap.Label
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Label = ControlBase.extend("ui5strap.Label", {
		metadata : {
			deprecated : true,
			
			interfaces : ["ui5strap.IText"],
			
			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				}, 
				severity : {
					type:"ui5strap.Severity", 
					defaultValue:ui5strap.Severity.Info
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			}
		},
		
		renderer : function(rm, oControl) {
			rm.write("<span");
			rm.writeControlData(oControl);
			rm.addClass("label label-" + ui5strap.BSSeverity[oControl.getSeverity()] );
			rm.writeClasses();
			rm.write(">");
			
			rm.writeEscaped(oControl.getText());
			
			rm.write("</span>");

			ui5strap.RenderUtils.renderTrail(rm, oControl);
		}
	});
	
	return Label;
});