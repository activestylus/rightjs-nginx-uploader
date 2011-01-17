/**
 * Form uploading progress bar feature
 * http://rightjs.org/ui/uploader
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
var Uploader=RightJS.Uploader=function(b){var m=b.$,n=b.$w,h=b.$E,o=b.Xhr,j=b.Form,k=b.RegExp,g=new (function(a,c){if(!c){c=a;a="DIV"}var e=new b.Class(b.Element.Wrappers[a]||b.Element,{initialize:function(f,d){this.key=f;var l=[{"class":"rui-"+f}];this instanceof b.Input||this instanceof b.Form||l.unshift(a);this.$super.apply(this,l);if(b.isString(d))d=b.$(d);if(d instanceof b.Element){this._=d._;if("$listeners"in d)d.$listeners=d.$listeners;d={}}this.setOptions(d,this);return b.Wrapper.Cache[b.$uid(this._)]=
this},setOptions:function(f,d){d=d||this;b.Options.setOptions.call(this,b.Object.merge(f,eval("("+(d.get("data-"+this.key)||"{}")+")")));return this}});e=new b.Class(e,c);b.Observer.createShortcuts(e.prototype,e.EVENTS||[]);return e})({extend:{version:"2.2.0",EVENTS:n("start update finish error"),Options:{url:"/progress",param:"X-Progress-ID",timeout:1E3,round:0,fxDuration:400,cssRule:"[data-uploader]"}},initialize:function(a,c){this.form=a=m(a);var e=a.first(".rui-uploader");this.$super("uploader",
e).setOptions(c,this.form).addClass("rui-progress-bar").insert([this.bar=this.first(".bar")||h("div",{"class":"bar"}),this.num=this.first(".num")||h("div",{"class":"num"})]);e||this.insertTo(a)},start:function(){var a={state:"starting"};return this.paint(a).prepare().request().fire("start",{data:a})},update:function(a){this.paint(a).fire("update",{data:a});switch(a.state){case "starting":case "uploading":b(this.request).bind(this).delay(this.options.timeout);break;case "done":this.fire("finish",{data:a});
break;case "error":this.fire("error",{data:a});break}return this},paint:function(a){var c=(this.percent||0)/100;switch(a.state){case "starting":c=0;break;case "done":c=1;break;case "uploading":c=a.received/(a.size||1);break}this.percent=b(c*100).round(this.options.round);if(this.percent===0||!b.Fx||!this.options.fxDuration){this.bar._.style.width=this.percent+"%";this.num._.innerHTML=this.percent+"%"}else{this.bar.morph({width:this.percent+"%"},{duration:this.options.fxDuration});b(function(){this.num._.innerHTML=
this.percent+"%"}).bind(this).delay(this.options.fxDuration/2)}this[a.state==="error"?"addClass":"removeClass"]("rui-progress-bar-failed");return this},request:function(){o.load(this.options.url+"?"+this.options.param+"="+this.uid,{evalJSON:false,onSuccess:b(function(a){this.update(eval("("+a.text+")"))}).bind(this)});return this},prepare:function(){this.uid="";for(i=0;i<32;i++)this.uid+=Math.random(0,15).toString(16);var a=this.options.param,c=this.form.get("action").replace(new k("(\\?|&)"+k.escape(a)+
"=[^&]*","i"),"");this.form.set("action",(b(c).includes("?")?"&":"?")+a+"="+this.uid);this.show();return this}}),p=j.prototype.send;j.include({send:function(){if(!this.uploader&&(this.match(g.Options.cssRule)||this.first(".rui-uploader")))this.uploader=new g(this);this.uploader&&this.uploader.start();return p.apply(this,arguments)}});(function(){var a=document.createElement("style"),c=document.createTextNode("div.rui-progress-bar,div.rui-progress-bar *{margin:0;padding:0;border:none;background:none}div.rui-progress-bar{position:relative;height:1.4em;line-height:1.4em;width:20em;border:1px solid #999}div.rui-progress-bar,div.rui-progress-bar div.bar{border-radius:0.25em;-moz-border-radius:0.25em;-webkit-border-radius:0.25em}div.rui-progress-bar div.bar{position:absolute;left:0;top:0;width:0%;height:100%;background:#CCC;z-index:1}div.rui-progress-bar div.num{position:absolute;width:100%;height:100%;z-index:2;text-align:center}div.rui-progress-bar-failed{border-color:red;color:red;background:pink}.rui-uploader{display:none}");
a.type="text/css";if(a.styleSheet)a.styleSheet.cssText=c.nodeValue;else a.appendChild(c);document.getElementsByTagName("head")[0].appendChild(a)})();return g}(RightJS);
