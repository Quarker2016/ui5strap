/*
 * 
 * UI5Strap
 *
 * ui5strap.ListMedia
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var ListMedia = ListBase.extend("ui5strap.ListMedia", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : { 
				container : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListMediaItem",
					singularName: "item"
				} 
			}

		}
	}),
	ListMediaProto = ListMedia.prototype;
	
	/**
	 * @Protected
	 * @Override
	 */
	ListMediaProto._getStyleClassRoot = function(){
		var styleClass = this._getStyleClassPrefix() + " media-list";
		return styleClass;
	};
	
	return ListMedia;
});