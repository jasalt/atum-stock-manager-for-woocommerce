!function(t){function e(s){if(n[s])return n[s].exports;var o=n[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,s){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=64)}({0:function(t,e,n){"use strict";var s=function(){function t(t,e){void 0===e&&(e={}),this.varName=t,this.defaults=e,this.settings={};var n=void 0!==window[t]?window[t]:{};Object.assign(this.settings,e,n)}return t.prototype.get=function(t){if(void 0!==this.settings[t])return this.settings[t]},t.prototype.getAll=function(){return this.settings},t.prototype.delete=function(t){this.settings.hasOwnProperty(t)&&delete this.settings[t]},t}();e.a=s},64:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),o=n(65);jQuery(function(t){window.$=t;var e=new s.a("atumAddons");new o.a(e)})},65:function(t,e,n){"use strict";var s=function(){function t(t){var e=this;this.settings=t,this.swal=window.swal,this.$addonsList=$(".atum-addons"),this.$addonsList.on("click",".addon-key button",function(t){t.preventDefault();var n=$(t.currentTarget),s=n.siblings("input").val();if(!s)return e.showErrorAlert(e.settings.get("invalidKey")),!1;n.hasClass("deactivate-key")?e.swal({title:e.settings.get("limitedDeactivations"),html:e.settings.get("allowedDeactivations"),type:"warning",confirmButtonText:e.settings.get("continue"),cancelButtonText:e.settings.get("cancel"),showCancelButton:!0}).then(function(){e.requestLicenseChange(n,s)}).catch(e.swal.noop):e.requestLicenseChange(n,s)}).on("click",".install-addon",function(t){var n=$(t.currentTarget),s=n.closest(".theme");$.ajax({url:window.ajaxurl,method:"POST",dataType:"json",data:{token:e.$addonsList.data("nonce"),action:"atum_install_addon",addon:s.data("addon"),slug:s.data("addon-slug"),key:s.find(".addon-key input").val()},beforeSend:function(){e.beforeAjax(n)},success:function(t){e.afterAjax(n),!0===t.success?e.showSuccessAlert(t.data):e.showErrorAlert(t.data)}})}).on("click",".show-key",function(t){$(t.currentTarget).closest(".theme").find(".addon-key").slideToggle("fast")})}return t.prototype.requestLicenseChange=function(t,e){var n=this;$.ajax({url:window.ajaxurl,method:"POST",dataType:"json",data:{token:this.$addonsList.data("nonce"),action:t.data("action"),addon:t.closest(".theme").data("addon"),key:e},beforeSend:function(){n.beforeAjax(t)},success:function(s){switch(n.afterAjax(t),s.success){case!1:n.showErrorAlert(s.data);break;case!0:n.showSuccessAlert(s.data);break;case"activate":n.swal({title:n.settings.get("activation"),html:s.data,type:"info",showCancelButton:!0,showLoaderOnConfirm:!0,confirmButtonText:n.settings.get("activate"),allowOutsideClick:!1,preConfirm:function(){return new Promise(function(s,o){$.ajax({url:window.ajaxurl,method:"POST",dataType:"json",data:{token:n.$addonsList.data("nonce"),action:"atum_activate_license",addon:t.closest(".theme").data("addon"),key:e},success:function(t){!0===t.success?s():o(t.data)}})})}}).then(function(){n.showSuccessAlert(n.settings.get("addonActivated"),n.settings.get("activated"))}).catch(n.swal.noop)}}})},t.prototype.showSuccessAlert=function(t,e){e||(e=this.settings.get("success")),this.swal({title:e,html:t,type:"success",confirmButtonText:this.settings.get("ok")}).then(function(){location.reload()})},t.prototype.showErrorAlert=function(t){this.swal({title:this.settings.get("error"),html:t,type:"error",confirmButtonText:this.settings.get("ok")})},t.prototype.beforeAjax=function(t){$(".theme").find(".button").prop("disabled",!0),t.css("visibility","hidden").after('<div class="atum-loading"></div>')},t.prototype.afterAjax=function(t){$(".atum-loading").remove(),$(".theme").find(".button").prop("disabled",!1),t.css("visibility","visible")},t}();e.a=s}});
//# sourceMappingURL=atum-addons.js.map