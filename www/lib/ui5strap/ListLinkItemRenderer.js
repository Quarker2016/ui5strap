/*
 * 
 * UI5Strap
 *
 * ui5strap.ListLinkItemRenderer
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

	jQuery.sap.declare("ui5strap.ListLinkItemRenderer");
	
	ui5strap.ListLinkItemRenderer = {
	};

	ui5strap.ListLinkItemRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl, {});

		var text = oControl.getText(),
			parse = oControl.getParse();
	
		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
	
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);

		this.endRender(rm, oControl);
	};

	ui5strap.ListLinkItemRenderer.startRender = function(rm, oControl){
		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");

		this.startRenderLink(rm, oControl);
	};

	ui5strap.ListLinkItemRenderer.endRender = function(rm, oControl){
		rm.write('</a>');
		    
		rm.write("</li>");
	};
	
	ui5strap.ListLinkItemRenderer.startRenderLink = function(rm, oControl) {
		var href = oControl.getHref(),
			title = oControl.getTitle(),
			target = oControl.getTarget();

		rm.write("<a");

		rm.writeAttribute('id', oControl.getId() + '---link');
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
