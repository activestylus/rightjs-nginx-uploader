/**
 * Tabs widget for RightJS (http://rightjs.org/ui/tabs)
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
var Tabs=RightJS.Tabs=function(q,t,e){function u(){return h(e.Cookie?(v.get("right-tabs-indexes")||"").split(","):[])}function z(a,b,c){if(e.Cookie){var f=u();f=f.without.apply(f,b.map("id"));f.push(c.target.id);v.set("right-tabs-indexes",f.uniq().join(","),a)}}var h=e,r=e.$,A=e.$w,g=e.$E,B=e.Fx,C=e.Object,D=e.Browser,E=e.isArray,F=e.isNumber,w=e.Class,s=e.Element,v=e.Cookie,G=new e.Class(e.Element,{initialize:function(a){this.$super("div",{"class":"rui-spinner"});this.dots=[];for(var b=0;b<(a||4);b++)this.dots.push(new e.Element("div"));
this.dots[0].addClass("glowing");this.insert(this.dots);e(this.shift).bind(this).periodical(300)},shift:function(){if(this.visible()){var a=this.dots.pop();this.dots.unshift(a);this.insert(a,"top")}}}),j=new (function(a,b){if(!b){b=a;a="DIV"}var c=new e.Class(e.Element.Wrappers[a]||e.Element,{initialize:function(f,d){this.key=f;var i=[{"class":"rui-"+f}];this instanceof e.Input||this instanceof e.Form||i.unshift(a);this.$super.apply(this,i);if(e.isString(d))d=e.$(d);if(d instanceof e.Element){this._=
d._;if("$listeners"in d)d.$listeners=d.$listeners;d={}}this.setOptions(d,this);return e.Wrapper.Cache[e.$uid(this._)]=this},setOptions:function(f,d){d=d||this;e.Options.setOptions.call(this,e.Object.merge(f,eval("("+(d.get("data-"+this.key)||"{}")+")")));return this}});c=new e.Class(c,b);e.Observer.createShortcuts(c.prototype,c.EVENTS||[]);return c})("UL",{extend:{version:"2.2.0",EVENTS:A("select hide load disable enable add remove move"),Options:{idPrefix:"",tabsElement:null,resizeFx:"both",resizeDuration:400,
scrollTabs:false,scrollDuration:400,selected:null,disabled:null,closable:false,loop:false,loopPause:true,url:false,cache:false,Xhr:null,Cookie:null},rescan:function(a){r(a||q).find(".rui-tabs,*[data-tabs]").each(function(b){b instanceof j||new j(b)})}},initialize:function(a,b){this.$super("tabs",a).setOptions(b).addClass("rui-tabs");this.isHarmonica=this._.tagName==="DL";this.isCarousel=this.hasClass("rui-tabs-carousel");this.isSimple=!this.isHarmonica&&!this.isCarousel;this.findTabs().initScrolls().findCurrent().setStyle("visibility:visible");
this.options.disabled&&this.disable(this.options.disabled);this.options.loop&&this.startLoop()},select:function(a){return this.callTab(a,"select")},disable:function(a){return this.callTab(a,"disable")},enable:function(a){return this.callTab(a,"enable")},current:function(){return this.tabs.first("current")},enabled:function(){return this.tabs.filter("enabled")},callTab:function(a,b){h(E(a)?a:[a]).each(function(c){if(F(c))c=this.tabs[c];c&&c instanceof n&&c[b]()},this);return this},findTabs:function(){this.tabsList=
this.isHarmonica?this:r(this.options.tabsElement)||this.first(".rui-tabs-list")||(this.first("UL")||g("UL").insertTo(this)).addClass("rui-tabs-list");this.tabs=h([]);this.tabsList.children(this.isHarmonica?"dt":null).map(function(c){this.tabs.push(new n(c,this))},this);for(var a=0,b=this.tabsList.get("childNodes");a<b.length;a++)b[a].nodeType==3&&this.tabsList._.removeChild(b[a]);return this}}),n=j.Tab=new w(s,{extend:{autoId:0},initialize:function(a,b){this.$super(a._);this.addClass("rui-tabs-tab");
this.main=b;this.link=this.first("a");this.id=this.link.get("href").split("#")[1]||n.autoId++;this.panel=new H(this.findPanel(),this);this.current()&&this.select();b.options.closable&&this.link.insert(g("div",{"class":"rui-tabs-tab-close-icon",html:"&times;"}).onClick(h(this.remove).bind(this)));this.onClick(this._clicked)},select:function(){if(this.enabled()){var a=this.main.current();a&&a.removeClass("rui-tabs-current").fire("hide");this.addClass("rui-tabs-current");this.main.scrollToTab(this);
this.panel.show()}return this.fire("select")},disable:function(){return this.addClass("rui-tabs-disabled").fire("disable")},enable:function(){return this.removeClass("rui-tabs-disabled").fire("enable")},disabled:function(){return!this.enabled()},enabled:function(){return!this.hasClass("rui-tabs-disabled")},current:function(){return this.hasClass("rui-tabs-current")},remove:function(a){a&&a.stop();if(this.current()){a=this.main.enabled();(a=a[a.indexOf(this)+1]||a[a.indexOf(this)-1])&&a.select()}this.main.tabs.splice(this.main.tabs.indexOf(this),
1);this.panel.remove();return this.$super().fire("remove")},_clicked:function(a){a.stop();return this.select()},findPanel:function(){var a=this.main,b=a.options.idPrefix+this.id;if(a.isHarmonica)a=(a=this.next())&&a._.tagName==="DD"?a:g("DD").insertTo(this,"after");else a=r(b)||g(a._.tagName==="UL"?"LI":"DIV").insertTo(a);return a.set("id",b)},width:function(){var a=this.next();return a?a.position().x-this.position().x:this.size().x+1}}),H=j.Panel=new w(s,{initialize:function(a,b){this.$super(a._);
this.addClass("rui-tabs-panel");this.tab=b;this.id=this.get("id")},show:function(){return this.resizing(function(){this.tab.main.find(".rui-tabs-panel").each(function(a){a[a===this?"addClass":"removeClass"]("rui-tabs-current")},this)})},update:function(a){this.tab.current()?this.resizing(function(){s.prototype.update.call(this,a||"")}):this.$super(a||"");return this},lock:function(){this.insert(this.locker(),"top")},resizing:function(a){var b=this.tab.main;if(b.__working)return this.resizing.bind(this,
a).delay(100);var c=b.options,f=b.first(".rui-tabs-panel.rui-tabs-current"),d=this,i=f!==d,p=this.first("div.rui-tabs-panel-locker");d.parent().hasClass("rui-tabs-resizer")&&d.insertTo(f.parent());if(c.resizeFx&&e.Fx&&f&&(i||p)){b.__working=true;var m=c.resizeFx==="both"&&p?"slide":c.resizeFx,k=c.resizeDuration;k=B.Durations[k]||k;c=m==="fade"?0:m==="slide"?k:k/2;p=k-c;m!=="slide"&&d.setStyle({opacity:0});k=b.isHarmonica&&i?0:f.size().y;a.call(this);a=d.size().y;var l=null,o=null,x=null;if(m!=="fade"&&
k!==a){b._.style.height=b.size().y+"px";l=g("div",{"class":"rui-tabs-resizer",style:"height: "+k+"px"});if(b.isHarmonica&&i){f.addClass("rui-tabs-current");o=g("div",{"class":"rui-tabs-resizer"});o._.style.height=f.size().y+"px";x=function(){o.replace(f.removeClass("rui-tabs-current"))};f.wrap(o);l._.style.height="0px"}d.wrap(l);b._.style.height="auto"}else{rezise_duration=0;k=p}var y=0;i=function(){if(l){if(m=="both"&&!y)return y++;l.replace(d)}b.__working=false};o&&o.morph({height:"0px"},{duration:c,
onFinish:x});l&&l.morph({height:a+"px"},{duration:c,onFinish:i});m!=="slide"&&d.morph.bind(d,{opacity:1},{duration:p,onFinish:i}).delay(c);!l&&m==="slide"&&i()}else a.call(this);return this},locker:function(){return this._locker||(this._locker=g("div",{"class":"rui-tabs-panel-locker"}).insert(new G(5)))}});j.include({next:function(){return this.pickTab(+1)},prev:function(){return this.pickTab(-1)},scrollLeft:function(){this.prevButton.hasClass("rui-tabs-scroller-disabled")||this[this.isCarousel?"prev":
"justScroll"](+0.6);return this},scrollRight:function(){this.nextButton.hasClass("rui-tabs-scroller-disabled")||this[this.isCarousel?"next":"justScroll"](-0.6);return this},initScrolls:function(){if(this.scrollable=this.options.scrollTabs||this.isCarousel)this.buildScroller();return this},buildScroller:function(){if(!((this.prevButton=this.first(".rui-tabs-scroller-prev"))&&(this.nextButton=this.first(".rui-tabs-scroller-next")))){this.prevButton=g("div",{"class":"rui-tabs-scroller-prev",html:"&laquo;"});
this.nextButton=g("div",{"class":"rui-tabs-scroller-next",html:"&raquo;"});g("div").insertTo(this.tabsList,"before").replace(g("div",{"class":"rui-tabs-scroller"}).insert([this.prevButton,this.nextButton,this.scroller=g("div",{"class":"rui-tabs-scroller-body"}).insert(this.tabsList)])).remove()}this.prevButton.onClick(h(this.scrollLeft).bind(this));this.nextButton.onClick(h(this.scrollRight).bind(this))},pickTab:function(a){var b=this.current();if(b&&b.enabled()){var c=this.enabled();(a=c[c.indexOf(b)+
a])&&a.select()}},scrollToTab:function(a){if(this.scroller){for(var b=0,c=0;c<this.tabs.length;c++){b+=this.tabs[c].width();if(this.tabs[c]===a)break}c=this.scroller.size().x;var f=(this.isCarousel?c/2+a.width()/2:c)-b;if(!this.isCarousel){var d=t(this.tabsList.getStyle("left")||0,10);if(f>=d&&f<d+c-a.width())f=d;else if(d>-b&&d<=a.width()-b)f=a.width()-b}this.scrollTo(f)}},justScroll:function(a){if(!this.scroller)return this;var b=t(this.tabsList.getStyle("left")||0,10),c=this.scroller.size().x;
this.scrollTo(b+c*a)},scrollTo:function(a){var b=this.scroller.size().x,c=this.tabs.map("width").sum();if(a<b-c)a=b-c;if(a>0)a=0;this.tabsList.morph({left:a+"px"},{duration:this.options.scrollDuration});this.checkScrollButtons(c,b,a)},checkScrollButtons:function(a,b,c){var f=false,d=false;if(this.isCarousel){a=this.enabled();if(b=a.first("current")){d=a.indexOf(b);f=d>0;d=d<a.length-1}}else{f=c!==0;d=c>b-a}this.prevButton[f?"removeClass":"addClass"]("rui-tabs-scroller-disabled");this.nextButton[d?
"removeClass":"addClass"]("rui-tabs-scroller-disabled")}});j.include({findCurrent:function(){var a=this.enabled();(a=this.tabs[this.options.selected]||this.tabs[this.urlIndex()]||this.tabs[this.cookieIndex()]||a.first("current")||a[0])&&a.select();this.options.Cookie&&this.onSelect(h(z).curry(this.options.Cookie,this.tabs));return this},urlIndex:function(){var a=-1,b=q.location.href.split("#")[1];if(b)for(var c=0;c<this.tabs.length;c++)if(this.tabs[c].id==b){a=c;break}return a},cookieIndex:function(){var a=
-1;if(this.options.Cookie)for(var b=u(),c=0;c<this.tabs.length;c++)if(b.include(this.tabs[c].id)){a=c;break}return a}});j.include({add:function(a,b,c){c=c||{};a=g(this.isHarmonica?"dt":"li").insert(g("a",{html:a,href:c.url||"#"+(c.id||"")})).insertTo(this.tabsList);a=new n(a,this);a.panel.update(b||"");this.tabs.push(a);a.fire("add");"position"in c&&this.move(a,c.position);return this},move:function(a,b){a=this.tabs[a]||a;if(this.tabs[b]&&this.tabs[b]!==a){this.tabs[b].insert(a,b===this.tabs.length-
1?"after":"before");this.isHarmonica&&a.insert(a.panel,"after");this.tabs.splice(this.tabs.indexOf(a),1);this.tabs.splice(b,0,a);a.fire("move",{index:b})}return this},remove:function(a){return this.callTab(a,"remove")}});var I=n.prototype.select;n.include({select:function(){if(this.dogPiling(arguments))return this;var a=I.apply(this,arguments),b=h(this.link.get("href")),c=this.main.options;if(b.includes("#"))b=c.url?c.url.replace("%{id}",b.split("#")[1]):null;if(b&&!this.request&&!(c.cache||this.cache)){this.panel.lock();
try{this.request=(new e.Xhr(b,C.merge({method:"get"},c.Xhr))).onComplete(h(function(d){if(this.main.__working)return arguments.callee.bind(this,d).delay(100);this.panel.update(d.text);this.request=null;if(c.cache)this.cache=true;this.fire("load")}).bind(this)).send()}catch(f){if(!D.OLD)throw f;}}return a},dogPiling:function(a){if(this.main.__working){this.main.__timeout&&this.main.__timeout.cancel();this.main.__timeout=h(function(b){this.select.apply(this,b)}).bind(this,a).delay(100);return true}return this.main.__timeout=
null}});j.include({startLoop:function(a){if(!a&&!this.options.loop)return this;if(this.options.loopPause){this._stopLoop=this._stopLoop||h(this.stopLoop).bind(this,true);this._startLoop=this._startLoop||h(this.startLoop).bind(this,a);this.forgetHovers().on({mouseover:this._stopLoop,mouseout:this._startLoop})}this.timer&&this.timer.stop();this.timer=h(function(){var b=this.enabled(),c=this.current();this.select(b[b.indexOf(c)+1]||b.first())}).bind(this).periodical(this.options.loop||a);return this},
stopLoop:function(a,b){if(this.timer){this.timer.stop();this.timer=null}!b&&this._startLoop&&this.forgetHovers()},forgetHovers:function(){return this.stopObserving("mouseover",this._stopLoop).stopObserving("mouseout",this._startLoop)}});r(q).onReady(function(){j.rescan()});q.write('<style type="text/css">div.rui-spinner,div.rui-spinner div{margin:0;padding:0;border:none;background:none;list-style:none;font-weight:normal;float:none;display:inline-block; *display:inline; *zoom:1;border-radius:.12em;-moz-border-radius:.12em;-webkit-border-radius:.12em}div.rui-spinner{text-align:center;white-space:nowrap;background:#EEE;border:1px solid #DDD;height:1.2em;padding:0 .2em}div.rui-spinner div{width:.4em;height:70%;background:#BBB;margin-left:1px}div.rui-spinner div:first-child{margin-left:0}div.rui-spinner div.glowing{background:#777}.rui-tabs,.rui-tabs-list,.rui-tabs-tab,.rui-tabs-panel,.rui-tabs-scroll-left,.rui-tabs-scroll-right,.rui-tabs-scroll-body,.rui-tabs-panel-locker,.rui-tabs-resizer{margin:0;padding:0;background:none;border:none;list-style:none;display:block;width:auto;height:auto}.rui-tabs{display:block;visibility:hidden;border-bottom:1px solid #CCC}.rui-tabs-resizer{overflow:hidden}.rui-tabs-list{display:block;position:relative;padding:0 .5em;border-bottom:1px solid #CCC;white-space:nowrap}.rui-tabs-list .rui-tabs-tab,.rui-tabs-tab *,.rui-tabs-tab *:hover{display:inline-block; *display:inline; *zoom:1;cursor:pointer;text-decoration:none;vertical-align:center}.rui-tabs-list .rui-tabs-tab{vertical-align:bottom;margin-right:.1em}.rui-tabs-tab a{outline:none;position:relative;border:1px solid #CCC;background:#DDD;color:#444;padding:.3em 1em;border-radius:.3em;-moz-border-radius:.3em;-webkit-border-radius:.3em;border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0;-moz-border-radius-bottomleft:0;-moz-border-radius-bottomright:0;-webkit-border-bottom-left-radius:0;-webkit-border-bottom-right-radius:0}.rui-tabs-tab a:hover{border-color:#CCC;background:#EEE}.rui-tabs-list .rui-tabs-current a,.rui-tabs-list .rui-tabs-current a:hover{font-weight:bold;color:#000;background:#FFF;border-bottom:1px solid #FFF;border-top-width:2px;padding-top:.34em;padding-bottom:.34em;top:1px}.rui-tabs-tab a img{border:none;opacity:.6;filter:alpha(opacity=60)}.rui-tabs-tab a:hover img,.rui-tabs-list .rui-tabs-current a img{opacity:1;filter:alpha(opacity=100)}.rui-tabs-disabled a,.rui-tabs-disabled a:hover{background:#EEE;border-color:#DDD;color:#AAA;cursor:default}.rui-tabs-disabled a img,.rui-tabs-disabled a:hover img{opacity:.5;filter:alpha(opacity=50)}.rui-tabs-tab-close-icon{display:inline-block; *display:inline; *zoom:1;margin-right:-0.5em;margin-left:0.5em;cursor:pointer;opacity:0.5;filter:alpha(opacity=50)}.rui-tabs-tab-close-icon:hover{opacity:1;filter:alpha(opacity=100);color:#B00;text-shadow:#888 .15em .15em .2em}.rui-tabs-panel{display:none;position:relative;min-height:4em;padding:.5em 0}.rui-tabs-current{display:block}.rui-tabs-scroller{position:relative;padding:0 1.4em}.rui-tabs-scroller-prev,.rui-tabs-scroller-next{width:1.1em;text-align:center;background:#EEE;color:#666;cursor:pointer;border:1px solid #CCC;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em;position:absolute;bottom:0px;left:0px;padding:0.3em 0;user-select:none;-moz-user-select:none;-webkit-user-select:none}.rui-tabs-scroller-prev:hover,.rui-tabs-scroller-next:hover{color:#000;background:#DDD;border-color:#AAA}.rui-tabs-scroller-prev:active,.rui-tabs-scroller-next:active{background:#eee;border-color:#ccc}.rui-tabs-scroller-next{left:auto;right:0px}.rui-tabs-scroller-disabled,.rui-tabs-scroller-disabled:hover{cursor:default;background:#DDD;border-color:#DDD;color:#AAA}.rui-tabs-scroller-body{overflow:hidden;width:100%;position:relative}.rui-tabs-scroller .rui-tabs-list{padding-left:0;padding-right:0;width:9999em;z-index:10}.rui-tabs-panel-locker{position:absolute;top:0px;left:0px;opacity:0.5;filter:alpha(opacity=50);background:#CCC;width:100%;height:100%;text-align:center}.rui-tabs-panel-locker .rui-spinner{position:absolute;left:44%;top:44%;background:none;border:none;height:2em}.rui-tabs-panel-locker .rui-spinner div{background:#666;width:.65em;margin-left:.15em}.rui-tabs-panel-locker .rui-spinner div.glowing{background:#000}.rui-tabs-carousel .rui-tabs-list{border:none}.rui-tabs-carousel .rui-tabs-tab a,.rui-tabs-carousel .rui-tabs-scroller .rui-tabs-scroller-prev,.rui-tabs-carousel .rui-tabs-scroller .rui-tabs-scroller-next{height:6em;line-height:6em;padding:0;border-bottom:1px solid #ccc;border-radius:.25em;-moz-border-radius:.25em;-webkit-border-radius:.25em}.rui-tabs-carousel .rui-tabs-tab{margin-right:3px}.rui-tabs-carousel .rui-tabs-tab a img{border:1px solid #CCC;vertical-align:middle;margin:.4em;padding:0;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0}.rui-tabs-carousel .rui-tabs-list .rui-tabs-current a{border-width:1px;border-color:#AAA;padding:0;top:auto}.rui-tabs-carousel .rui-tabs-list .rui-tabs-current a img{border-color:#bbb}.rui-tabs-carousel .rui-tabs-panel{text-align:center}dl.rui-tabs{border:none}dt.rui-tabs-tab,dt.rui-tabs-tab a,dt.rui-tabs-tab a:hover{display:block;float:none}dt.rui-tabs-tab a,dt.rui-tabs-tab a:hover{padding:.2em 1em;border:1px solid #ccc;border-radius:.25em;-moz-border-radius:.3em;-webkit-border-radius:.3em}dl.rui-tabs dt.rui-tabs-current a{background:#EEE;border-bottom-left-radius:0;border-bottom-right-radius:0;-moz-border-radius-bottomleft:0;-moz-border-radius-bottomright:0;-webkit-border-bottom-left-radius:0;-webkit-border-bottom-right-radius:0}dl.rui-tabs dd.rui-tabs-current+dt.rui-tabs-tab a{border-top-left-radius:0;border-top-right-radius:0;-moz-border-radius-topleft:0;-moz-border-radius-topright:0;-webkit-border-top-left-radius:0;-webkit-border-top-right-radius:0}</style>');
return j}(document,parseInt,RightJS);
