!function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=66)}({0:function(t,e,n){"use strict";var o=function(){function t(t,e){void 0===e&&(e={}),this.varName=t,this.defaults=e,this.settings={};var n=void 0!==window[t]?window[t]:{};Object.assign(this.settings,e,n)}return t.prototype.get=function(t){if(void 0!==this.settings[t])return this.settings[t]},t.prototype.getAll=function(){return this.settings},t.prototype.delete=function(t){this.settings.hasOwnProperty(t)&&delete this.settings[t]},t}();e.a=o},66:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(67),i=n(0);window.$=window.jQuery,jQuery(function(t){var e=new i.a("atumMarketingPopupVars");new o.a(e)})},67:function(t,e,n){"use strict";var o=function(){function t(t){this.settings=t,this.swal=window.swal,this.getPopupInfo()}return t.prototype.getPopupInfo=function(){var t=this;$.ajax({url:window.ajaxurl,dataType:"json",method:"post",data:{action:"atum_get_marketing_popup_info",token:this.settings.get("nonce")},success:function(e){if(!0===e.success){var n=e.data,o=n.description.text_color?"color:"+n.description.text_color+";":"",i=n.description.text_size?"font-size:"+n.description.text_size+";":"",s=n.description.text_align?"text-align:"+n.description.text_align+";":"",r=n.description.padding?"padding:"+n.description.padding+";":"",a='<p data-transient-key="'+n.transient_key+'" style="'+(o+i+s+r)+'">'+n.description.text+"</p>",c="",u="",p="",l=n.description.text_color?"color:"+n.title.text_color+";":"",d=n.description.text_size?"font-size:"+n.title.text_size+";":"",g=n.description.text_align?"text-align:"+n.title.text_align+";":"",f='<h1 style="'+(l+d+g)+'">'+n.title.text+"</h1>",h="",w=n.images.top_left,x='<img class="mp-logo" src="'+n.images.logo+'">';n.version&&Object.keys(n.version).length&&(c=n.version.text_color?"color:"+n.version.text_color+";":"",u=n.version.background?"background:"+n.version.background+";":"",p='<span class="version" style="'+(u+c)+'">'+n.version.text+"</span>"),n.buttons&&n.buttons.length&&n.buttons.forEach(function(t){h+='<button data-url="'+t.url+'" class="'+t.class+' popup-button" style="'+t.css+'">'+t.text+"</button>"}),t.swal({width:520,padding:null,customClass:"marketing-popup",background:n.background,showCloseButton:!0,showConfirmButton:!1,html:x+f+p+a+h,imageUrl:w}).catch(t.swal.noop),$(".popup-button").on("click",function(t){t.preventDefault(),window.open($(t.currentTarget).data("url"),"_blank")}),$(".marketing-popup .swal2-close").on("click",function(){t.hideMarketingPopup($(".swal2-content p").data("transient-key"))})}}})},t.prototype.hideMarketingPopup=function(t){$.ajax({url:window.ajaxurl,dataType:"json",method:"post",data:{action:"atum_hide_marketing_popup",token:this.settings.get("nonce"),transientKey:t}})},t}();e.a=o}});
//# sourceMappingURL=atum-marketing-popup.js.map