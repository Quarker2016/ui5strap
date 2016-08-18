/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./CustomStyleClassSupport','./Element','./UIArea','./RenderManager','./ResizeHandler','./BusyIndicatorUtils'],function(q,C,E,U,R,a,B){"use strict";var b=E.extend("sap.ui.core.Control",{metadata:{stereotype:"control","abstract":true,publicMethods:["placeAt","attachBrowserEvent","detachBrowserEvent","getControlsByFieldGroup","triggerValidateFieldGroup","checkFieldGroupIds"],library:"sap.ui.core",properties:{"busy":{type:"boolean",defaultValue:false},"busyIndicatorDelay":{type:"int",defaultValue:1000},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"fieldGroupIds":{type:"string[]",defaultValue:[]}},events:{validateFieldGroup:{enableEventBubbling:true,parameters:{fieldGroupIds:{type:"string[]"}}}}},constructor:function(i,s){this.bAllowTextSelection=true;E.apply(this,arguments);this.bOutput=this.getDomRef()!=null;if(this._sapUiCoreLocalBusy_initBusyIndicator){this._sapUiCoreLocalBusy_initBusyIndicator();}},renderer:null});b.prototype.clone=function(){var d=E.prototype.clone.apply(this,arguments);if(this.aBindParameters){for(var i=0,l=this.aBindParameters.length;i<l;i++){var P=this.aBindParameters[i];d.attachBrowserEvent(P.sEventType,P.fnHandler,P.oListener!==this?P.oListener:undefined);}}d.bAllowTextSelection=this.bAllowTextSelection;return d;};C.apply(b.prototype);b.prototype.isActive=function(){return q.sap.domById(this.sId)!=null;};b.prototype.invalidate=function(O){var u;if(this.bOutput&&(u=this.getUIArea())){if(!this._bIsBeingDestroyed){u.addInvalidatedControl(this);}}else{var P=this.getParent();if(P&&(this.bOutput||!(this.getVisible&&this.getVisible()===false))){P.invalidate(this);}}};b.prototype.rerender=function(){U.rerenderControl(this);};b.prototype.getDomRef=function(s){if(this.bOutput===false&&!this.oParent){return null;}return E.prototype.getDomRef.call(this,s);};b.prototype.allowTextSelection=function(d){this.bAllowTextSelection=d;return this;};b.prototype.attachBrowserEvent=function(e,H,l){if(e&&(typeof(e)==="string")){if(H&&typeof(H)==="function"){if(!this.aBindParameters){this.aBindParameters=[];}l=l||this;var P=function(){H.apply(l,arguments);};this.aBindParameters.push({sEventType:e,fnHandler:H,oListener:l,fnProxy:P});if(!this._sapui_bInAfterRenderingPhase){this.$().bind(e,P);}}}return this;};b.prototype.detachBrowserEvent=function(e,H,l){if(e&&(typeof(e)==="string")){if(H&&typeof(H)==="function"){var $=this.$(),i,P;l=l||this;if(this.aBindParameters){for(i=this.aBindParameters.length-1;i>=0;i--){P=this.aBindParameters[i];if(P.sEventType===e&&P.fnHandler===H&&P.oListener===l){this.aBindParameters.splice(i,1);$.unbind(e,P.fnProxy);}}}}}return this;};b.prototype.getRenderer=function(){return R.getRenderer(this);};b.prototype.placeAt=function(d,P){var e=sap.ui.getCore();if(e.isInitialized()){var f=d;if(typeof f==="string"){f=e.byId(d);}var i=false;if(!(f instanceof E)){f=e.createUIArea(d);i=true;}if(!f){return this;}if(!i){var g=f.getMetadata().getAggregation("content");var j=true;if(g){if(!g.multiple||g.type!="sap.ui.core.Control"){j=false;}}else if(!f.addContent||!f.insertContent||!f.removeAllContent){j=false;}if(!j){q.sap.log.warning("placeAt cannot be processed because container "+f+" does not have an aggregation 'content'.");return this;}}if(typeof P==="number"){f.insertContent(this,P);}else{P=P||"last";switch(P){case"last":f.addContent(this);break;case"first":f.insertContent(this,0);break;case"only":f.removeAllContent();f.addContent(this);break;default:q.sap.log.warning("Position "+P+" is not supported for function placeAt.");}}}else{var t=this;e.attachInitEvent(function(){t.placeAt(d,P);});}return this;};b.prototype.onselectstart=function(d){if(!this.bAllowTextSelection){d.preventDefault();d.stopPropagation();}};b.prototype.getIdForLabel=function(){return this.getId();};b.prototype.destroy=function(s){this._bIsBeingDestroyed=true;this._cleanupBusyIndicator();a.deregisterAllForControl(this.getId());if(!this.getVisible()){var P=document.getElementById(R.createInvisiblePlaceholderId(this));if(P&&P.parentNode){P.parentNode.removeChild(P);}}E.prototype.destroy.call(this,s);};var p="focusin focusout keydown keypress keyup mousedown touchstart touchmove mouseup touchend click",r=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,o={onAfterRendering:function(){if(this.getBusy()&&this.getDomRef()&&!this._busyIndicatorDelayedCallId&&!this.getDomRef("busyIndicator")){var d=this.getBusyIndicatorDelay();if(d){this._busyIndicatorDelayedCallId=q.sap.delayedCall(d,this,A);}else{A.call(this);}}}};function A(){var $=this.$(this._sBusySection);if(this._busyIndicatorDelayedCallId){q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId;}if(!$||$.length===0){q.sap.log.warning("BusyIndicator could not be rendered. The outer control instance is not valid anymore.");return;}var t=$.get(0)&&$.get(0).tagName;if(r.test(t)){q.sap.log.warning("BusyIndicator cannot be placed in elements with tag '"+t+"'.");return;}if($.css('position')=='static'){this._busyStoredPosition='static';$.css('position','relative');}this._$BusyIndicator=B.addHTML($,this.getId()+"-busyIndicator");B.animateIE9.start(this._$BusyIndicator);h.call(this,true);}function h(d){var $=this.$(this._sBusySection);if(d){var t=$.find(":sapTabbable"),e=this;this._busyTabIndices=[{ref:$,tabindex:$.attr('tabindex')}];$.attr('tabindex',-1);$.bind(p,c);t.each(function(i,O){var f=q(O),T=f.attr('tabindex');if(T<0){return true;}e._busyTabIndices.push({ref:f,tabindex:T});f.attr('tabindex',-1);f.bind(p,c);});}else{if(this._busyTabIndices){this._busyTabIndices.forEach(function(O){if(O.tabindex){O.ref.attr('tabindex',O.tabindex);}else{O.ref.removeAttr('tabindex');}O.ref.unbind(p,c);});}this._busyTabIndices=null;}}function c(e){q.sap.log.debug("Local Busy Indicator Event Suppressed: "+e.type);e.preventDefault();e.stopImmediatePropagation();}b.prototype.setBusy=function(d,s){this._sBusySection=s;var $=this.$(this._sBusySection);if(d==this.getProperty("busy")){return this;}this.setProperty("busy",d,true);if(d){this.addDelegate(o,false,this);}else{this.removeDelegate(o);if(this._busyIndicatorDelayedCallId){q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId;}}if(!this.getDomRef()){return this;}if(d){if(this.getBusyIndicatorDelay()<=0){A.call(this);}else{this._busyIndicatorDelayedCallId=q.sap.delayedCall(this.getBusyIndicatorDelay(),this,A);}}else{this.$("busyIndicator").remove();$.removeClass('sapUiLocalBusy');$.removeAttr('aria-busy');if(this._busyStoredPosition){$.css('position',this._busyStoredPosition);delete this._busyStoredPosition;}h.call(this,false);B.animateIE9.stop(this._$BusyIndicator);}return this;};b.prototype.isBusy=function(){return this.getProperty("busy");};b.prototype.setBusyIndicatorDelay=function(d){this.setProperty("busyIndicatorDelay",d,true);return this;};b.prototype._cleanupBusyIndicator=function(){if(this._busyIndicatorDelayedCallId){q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId;}B.animateIE9.stop(this._$BusyIndicator);};b.prototype.getControlsByFieldGroupId=function(f){return this.findAggregatedObjects(true,function(e){if(e instanceof b){return e.checkFieldGroupIds(f);}return false;});};b.prototype.checkFieldGroupIds=function(f){if(typeof f==="string"){if(f===""){return this.checkFieldGroupIds([]);}return this.checkFieldGroupIds(f.split(","));}var F=this._getFieldGroupIds();if(q.isArray(f)){var d=0;for(var i=0;i<f.length;i++){if(F.indexOf(f[i])>-1){d++;}}return d===f.length;}else if(!f&&F.length>0){return true;}return false;};b.prototype.triggerValidateFieldGroup=function(f){this.fireValidateFieldGroup({fieldGroupIds:f});};return b;});