/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.NavBar
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
	 * Constructor for a new NavBar instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap nav bars.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.NavBar
	 * 
	 */
	var NavBar = ControlBase.extend("pks.ui5strap.bs3.NavBar", /** @lends pks.ui5strap.bs3.NavBar.prototype */ {
		metadata : {
			deprecated : true,
			
			// ---- object ----
			defaultAggregation : "collapse",
			
			// ---- control specific ----
			library : "pks.ui5strap.bs3",

			properties : { 
				type : {
					type:"pks.ui5strap.bs3.NavBarType", 
					defaultValue:ui5strapBs3Lib.NavBarType.Default
				},
				inverse : {
					type:"boolean", 
					defaultValue:false
				},
				fluid : {
					type:"boolean", 
					defaultValue:false
				},
				collapsed : {
					type : "boolean",
					defaultValue : true
				},
				position : {
					type:"pks.ui5strap.bs3.NavBarPosition", 
					defaultValue: ui5strapBs3Lib.NavBarPosition.Default
				}
			},

			aggregations : { 
				
				collapse : {
					singularName: "collapse"
				},

				brand : {
					multiple : false,
					type : "pks.ui5strap.bs3.Link"
				},

				contentLeft : {
					
				},

				content : {

				},

				contentRight : {
					
				}
			}

		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.NavBar.prototype
	 */
	NavBarProto = pks.ui5strap.bs3.NavBar.prototype;

	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	NavBarProto._getStyleClassPrefix = function(){
		return "ui5strapNavBar";
	};
	
	NavBarProto.getCollapseId = function(){
		return this.getId() + '---collapse';
	};

	NavBarProto.setCollapsed = function(newCollapsed){
		if(newCollapsed === this.getCollapsed()){
			return this;
		}

		if(this.getDomRef()){
			var $collapse = jQuery('#' + this.getCollapseId());
			if(newCollapsed){
				$collapse
			      .height($collapse.height())
			      [0].offsetHeight

			    $collapse
			      .addClass('collapsing')
			      .removeClass('collapse')
			      .removeClass('in')

			    var complete = function () {
			      $collapse
			        .removeClass('collapsing')
			        .addClass('collapse')
			    }

			    if (!ui5strapBs3Lib.support.transition) return complete.call(this)

			    $collapse
			      .height(0)
			      .one(ui5strapBs3Lib.support.transition.end, complete)
			      .emulateTransitionEnd(350)

			}
			else{
				//$collapse.addClass('collapse in').height('auto');
			
				$collapse
      			.removeClass('collapse')
      			.addClass('collapsing')
      			.height(0);

    			var complete = function () {
			      	$collapse
			        .removeClass('collapsing')
			        .addClass('collapse in')
			        .height('auto')
			    	//fire event collapse completed
			    }

    			if (!ui5strapBs3Lib.support.transition) return complete.call(this)

    			$collapse
			      .one(ui5strapBs3Lib.support.transition.end, complete)
			      .emulateTransitionEnd(350)
			      
			      .height($collapse[0]["scrollHeight"])

			}


			this.setProperty('collapsed', newCollapsed, true);
		}
		else{
			this.setProperty('collapsed', newCollapsed);
		}

		return this;
	};

	NavBarProto.toggle = function(){
		this.setCollapsed(!this.getCollapsed());
	};
	
	return NavBar;
});