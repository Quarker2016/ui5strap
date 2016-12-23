/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Col
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
	 * Constructor for a new Column instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap grid columns.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Col
	 * 
	 */
	var Col = ControlBase.extend("pks.ui5strap.bs3.Col", /** @lends pks.ui5strap.bs3.Col.prototype */ {
		metadata : {
			interfaces : ["pks.ui5strap.bs3.IColumn"],
			
			library : "pks.ui5strap.bs3",
			
			properties : { 
				//Size DOES inherit from smaller sizes
				//TODO rename to sizeExtraSmall
				columnsExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeSmall
				columnsSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeMedium
				columnsMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeLarge
				columnsLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add sizeExtraLarge on Bootstrap 4 Upgrade
				
				//Offset DOES inherit from smaller sizes
				offsetExtraSmall : {
					type:"int", defaultValue:-1
				},
				offsetSmall : {
					type:"int", defaultValue:-1
				},
				offsetMedium : {
					type:"int", defaultValue:-1
				},
				offsetLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add offsetExtraLarge on Bootstrap 4 Upgrade
				
				//Pull DOES inherit from smaller sizes
				pullExtraSmall : {
					type:"int", defaultValue:-1
				},
				pullSmall : {
					type:"int", defaultValue:-1
				},
				pullMedium : {
					type:"int", defaultValue:-1
				},
				pullLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add pullExtraLarge on Bootstrap 4 Upgrade
				
				//Push DOES inherit from smaller sizes
				pushExtraSmall : {
					type:"int", defaultValue:-1
				},
				pushSmall : {
					type:"int", defaultValue:-1
				},
				pushMedium : {
					type:"int", defaultValue:-1
				},
				pushLarge : {
					type:"int", defaultValue:-1
				}
				//TODO add pushExtraLarge on Bootstrap 4 Upgrade
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				} 
			},
			
			defaultAggregation : "content"
		},
		
		renderer : function(rm, oControl){
			var content = oControl.getContent();

			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < content.length; i++){ 
					rm.renderControl(content[i]);
			}
			
			rm.write("</div>");
		}
	}), 
	/**
	 * @alias pks.ui5strap.bs3.Col.prototype
	 */
	ColProto = Col.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ColProto._getStyleClassPrefix = function(){
		return "ui5strapCol";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ColProto._getStyleClassDesign = function(){
		var styleClass = "",
			//Size
			//TODO rename to size*
			columsMedium = this.getColumnsMedium(),
			columsLarge = this.getColumnsLarge(),
			columsSmall = this.getColumnsSmall(),
			columsExtraSmall = this.getColumnsExtraSmall(),
			//Offset
			offsetMedium = this.getOffsetMedium(),
			offsetLarge = this.getOffsetLarge(),
			offsetSmall = this.getOffsetSmall(),
			offsetExtraSmall = this.getOffsetExtraSmall(),
			//Pull
			pullMedium = this.getPullMedium(),
			pullLarge = this.getPullLarge(),
			pullSmall = this.getPullSmall(),
			pullExtraSmall = this.getPullExtraSmall(),
			//Push
			pushMedium = this.getPushMedium(),
			pushLarge = this.getPushLarge(),
			pushSmall = this.getPushSmall(),
			pushExtraSmall = this.getPushExtraSmall();
	
		//Size
		if(0 < columsMedium){
			styleClass += " col-md-" + columsMedium;
		}
		if(0 < columsLarge){
			styleClass += " col-lg-" + columsLarge;
		}
		if(0 < columsSmall){
			styleClass += " col-sm-" + columsSmall;
		}
		if(0 < columsExtraSmall){
			styleClass += " col-xs-" + columsExtraSmall;
		}
	
		//Offset
		if(0 < offsetMedium){
			styleClass += " col-md-offset-" + offsetMedium;
		}
		if(0 < offsetLarge){
			styleClass += " col-lg-offset-" + offsetLarge;
		}
		if(0 < offsetSmall){
			styleClass += " col-sm-offset-" + offsetSmall;
		}
		if(0 < offsetExtraSmall){
			styleClass += " col-xs-offset-" + offsetExtraSmall;
		}
	
		//Pull
		if(0 < pullMedium){
			styleClass += " col-md-pull-" + pullMedium;
		}
		if(0 < pullLarge){
			styleClass += " col-lg-pull-" + pullLarge;
		}
		if(0 < pullSmall){
			styleClass += " col-sm-pull-" + pullSmall;
		}
		if(0 < pullExtraSmall){
			styleClass += " col-xs-pull-" + pullExtraSmall;
		}
	
		//Push
		if(0 < pushMedium){
			styleClass += " col-md-push-" + pushMedium;
		}
		if(0 < pushLarge){
			styleClass += " col-lg-push-" + pushLarge;
		}
		if(0 < pushSmall){
			styleClass += " col-sm-push-" + pushSmall;
		}
		if(0 < pushExtraSmall){
			styleClass += " col-xs-push-" + pushExtraSmall;
		}
		return styleClass;
	};
	
	return Col;
});