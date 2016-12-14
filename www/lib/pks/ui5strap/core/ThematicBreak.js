/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.ThematicBreak
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

sap.ui.define(['./library', "sap/ui/core/Control"], function(ui5strapBs3Lib, ControlBase){
	
	"use strict";
	
	/**
	 * Constructor for a new Line instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating horizontal lines. Use sparingly
	 * @extends sap.ui.core.Control
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.core.ThematicBreak
	 * 
	 */
	var ThematicBreak = ControlBase.extend("pks.ui5strap.core.ThematicBreak", /** @lends pks.ui5strap.core.ThematicBreak.prototype */ {
		metadata : {

			library : "pks.ui5strap.core"
			
		},
		
		renderer : function(rm, oControl) {
			rm.write("<hr");
			rm.writeControlData(oControl);
			rm.writeClasses();
			rm.write(" />");
		}
	});

	return ThematicBreak;
});