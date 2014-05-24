/*
 * 
 * UI5Strap
 *
 * RadioButtonRenderer
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.RadioButtonRenderer");

	ui5strap.RadioButtonRenderer = {};

	ui5strap.RadioButtonRenderer.render = function(rm, oControl) {
		var groupName = oControl.getGroupName(),
			type = oControl.getType(),
			typeBlock = ui5strap.RadioButtonType.Block;

		if(type === typeBlock){ 
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('radio');
			rm.writeClasses();
			rm.write(">");
		}
			
			rm.write("<label");
			if(type === ui5strap.RadioButtonType.Inline){
				rm.writeControlData(oControl);
				rm.addClass('radio-inline');
			}
			rm.writeClasses();
			rm.write(">");

				rm.write('<input')
				if(type === ui5strap.RadioButtonType.Default){
					rm.writeControlData(oControl);
				}
				else{
					rm.writeAttribute('id', 'ui5strap-radio---' + oControl.getId());
				}
				rm.writeAttribute('type', 'radio');
				rm.writeAttribute('value', oControl.getValue());
				rm.writeAttribute('name', groupName);
				if(oControl.getSelected()){
					rm.writeAttribute('checked', 'checked');
				}
				rm.addClass('ui5strap-radio-' + groupName);
				rm.writeClasses();
				rm.write('/>');
					
					rm.writeEscaped(oControl.getLabel());
		
			rm.write("</label>");

		if(type === typeBlock){ 
			rm.write("</div>");
		}
	};

}());