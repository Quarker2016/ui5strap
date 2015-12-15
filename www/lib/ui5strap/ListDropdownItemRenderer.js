/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownItemRenderer
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

(function(){

	jQuery.sap.declare("ui5strap.ListDropdownItemRenderer");
	jQuery.sap.require("ui5strap.library");
	
	ui5strap.ListDropdownItemRenderer = {
	};

	ui5strap.ListDropdownItemRenderer.render = function(rm, oControl) {
		var menu = oControl.getMenu();

		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.addClass('dropdown');
		rm.writeClasses();
		rm.write(">");

		this.startRenderLink(rm, oControl);
		
		this.renderContent(rm, oControl);

		rm.write('</a>');
		
		if(null !== menu){
			rm.renderControl(menu);
		}

		rm.write("</li>");
	};

	ui5strap.ListDropdownItemRenderer.renderContent = function(rm, oControl){
		var text = oControl.getText(),
			parse = oControl.getParse();
	
		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
	
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		rm.write(' <span class="caret"></span>');
	};
	
	ui5strap.ListDropdownItemRenderer.startRenderLink = function(rm, oControl) {
		var href = oControl.getHref(),
			title = oControl.getTitle(),
			target = oControl.getTarget();

		rm.write("<a");

		rm.writeAttribute('id', oControl.getId() + '---link');
		rm.addClass("dropdown-toggle");
	    
		rm.writeClasses();
		    
		if('' !== href){
			rm.writeAttribute('href', href);
		}

		if('' !== target){
			rm.writeAttribute('target', target);
		}

		if('' !== title){
	    	rm.writeAttribute('title', title);
	    }

		rm.write(">");
	};

}());
