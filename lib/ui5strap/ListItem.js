/*
 * 
 * UI5Strap
 *
 * ListItem
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

	jQuery.sap.declare("ui5strap.ListItem");

	sap.ui.core.Control.extend("ui5strap.ListItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				selected : {
					type:"boolean", 
					defaultValue:false
				}, 
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				text : {
					type:"string",
					defaultValue:""
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

}());