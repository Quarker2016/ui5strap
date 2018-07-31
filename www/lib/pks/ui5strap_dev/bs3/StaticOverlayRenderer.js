/*
 * 
 * UI5Strap
 *
 * ui5strap.OverlayRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
	"use strict";
	
	/**
	 * Static overlay renderer.
	 * @namespace
	 */
	var StaticOverlayRenderer = {};

	StaticOverlayRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl);
		
		//TODO dont use the modal-dialog css class here.
		rm.write("<div class='modal-dialog'>");
		this.renderContent(rm, oControl);
		rm.write("</div>");
		
		this.endRender(rm, oControl);
	};
	
	StaticOverlayRenderer.startRender = function(rm, oControl) {
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass(oControl._getStyleClass());
		rm.writeClasses();
		rm.write(">");
		
		if(oControl.getBackdrop()){
			rm.write('<div class="ui5strapStaticOverlay-backdrop" id="' + oControl.getId() + '--backdrop"></div>');
		}
	};	
	
	StaticOverlayRenderer.renderContent = function(rm, oControl){
		var content = oControl.getContent();
		
		for(var i = 0; i < content.length; i++){
			rm.renderControl(content[i]);
		}
	};
	
	StaticOverlayRenderer.endRender = function(rm, oControl) {
		rm.write("</div>");
	};
	
	return StaticOverlayRenderer;
	
}, true);