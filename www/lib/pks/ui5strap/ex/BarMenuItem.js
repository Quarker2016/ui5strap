/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.ex.BarMenuItem
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

sap.ui.define(['./library', 'ui5strap/library', 'ui5strap/ListItem', '../core/Utils'], function(ui5strapExLib, ui5strapBs3Lib, ListItem, Utils){
	
	"use strict";
	
	/**
	 * Constructor for a new ListItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating menu entries for the BarMenu control.
	 * @extends ui5strap.ListItem
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.ex.BarMenuItem
	 * 
	 */
	var BarMenuItem = ListItem.extend("pks.ui5strap.ex.BarMenuItem", {
		metadata : {

			library : "pks.ui5strap.ex",
			
			properties : { 
				icon : {
					type:"string",
					defaultValue : ""
				}
			},
			
			defaultAggregation : "content"
		},
		
		renderer : function(rm, oControl) {
			var icon = oControl.getIcon(),
				text = oControl.getText(),
				parse = oControl.getParse(),
				content = oControl.getContent(),
		        contentPlacement = oControl.getContentPlacement();

			rm.write("<li");
			rm.writeControlData(oControl);
			rm.addClass('u5sl-barmenu-item');
			if(oControl.getSelected()){
				rm.addClass('active');
			}
			rm.writeClasses();
			rm.write(">");
			
			if(contentPlacement === ui5strapBs3Lib.ContentPlacement.Start){
		    	for(var i = 0; i < content.length; i++){ 
					rm.renderControl(content[i]);
				}
		    }

			if(icon){
				rm.write('<span class="u5sl-barmenu-item-icon fa fa-' + icon + '"></span>');
			}
			
			if(text){
				if(parse){
					text = Utils.parseText(text);
				}
				
				rm.write('<span class="u5sl-barmenu-item-text">');
				if(parse){
					rm.write(text);
				}
				else{
					rm.writeEscaped(text);
				}
				rm.write('</span>');
			}
			
			if(contentPlacement === ui5strapBs3Lib.ContentPlacement.End){
				for(var i = 0; i < content.length; i++){ 
					rm.renderControl(content[i]);
				}
	        }

			rm.write("</li>");
		}
	}),
	BarMenuItemProto = BarMenuItem.prototype;
	
	/**
	 * TODO More efficient rerendering
	 */
	BarMenuItemProto.setText = function(newText, suppressInvalidate){
		this.setProperty('text', newText, suppressInvalidate);
	};
	
	return BarMenuItem;
});