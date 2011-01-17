/**
 * RigthJS UI RTE (http://rightjs.org/ui/rte)
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
var Rte=RightJS.Rte=function(h,l,q){var w=h.$,x=h.$$,B=h.$w,n=h.$E,y=h.$A,o=h.RegExp,g=h.Class,s=h.Element,c=new (function(a,b){if(!b){b=a;a="DIV"}var d=new h.Class(h.Element.Wrappers[a]||h.Element,{initialize:function(e,f){this.key=e;var j=[{"class":"rui-"+e}];this instanceof h.Input||this instanceof h.Form||j.unshift(a);this.$super.apply(this,j);if(h.isString(f))f=h.$(f);if(f instanceof h.Element){this._=f._;if("$listeners"in f)f.$listeners=f.$listeners;f={}}this.setOptions(f,this);return h.Wrapper.Cache[h.$uid(this._)]=
this},setOptions:function(e,f){f=f||this;h.Options.setOptions.call(this,h.Object.merge(e,eval("("+(f.get("data-"+this.key)||"{}")+")")));return this}});d=new h.Class(d,b);h.Observer.createShortcuts(d.prototype,d.EVENTS||[]);return d})({extend:{EVENTS:B("change focus blur"),supported:"contentEditable"in l.createElement("div"),Options:{toolbar:"small",autoresize:true,showToolbar:true,showStatus:true,videoSize:"425x344",cssRule:"textarea[data-rte]"},Toolbars:{small:["bold italic underline strike ttext|cut copy paste|header code quote|link image video|source"],
basic:["save clear|cut copy paste|bold italic underline strike ttext|left center right justify","undo redo|header code quote|link image video|dotlist numlist|indent outdent|source"],extra:["save clear|cut copy paste|bold italic underline strike ttext|left center right justify","undo redo|header code quote|link image video|subscript superscript|dotlist numlist|indent outdent","format|fontname fontsize|forecolor backcolor|source"]},Tools:{},Tags:{Bold:"b",Italic:"i",Underline:"u",Strike:"s",Ttext:"tt",
Code:"pre",Quote:"blockquote",Header:"h2"},Formats:{h1:"Header 1",h2:"Header 2",h3:"Header 3",h4:"Header 4",p:"Paragraph",pre:"Preformatted",blockquote:"Blockquote",tt:"Typetext",address:"Address"},FontNames:{"Andale Mono":"andale mono,times",Arial:"arial,helvetica,sans-serif","Arial Black":"arial black,avant garde","Book Antiqua":"book antiqua,palatino","Comic Sans MS":"comic sans ms,sans-serif","Courier New":"courier new,courier",Georgia:"georgia,palatino",Helvetica:"helvetica",Impact:"impact,chicago",
Symbol:"symbol",Tahoma:"tahoma,arial,helvetica,sans-serif",Terminal:"terminal,monaco","Times New Roman":"times new roman,times","Trebuchet MS":"trebuchet ms,geneva",Verdana:"verdana,geneva",Webdings:"webdings",Wingdings:"wingdings,zapf dingbats"},FontSizes:"6pt 7pt 8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 36pt",Videos:[[/(http:\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)/,"$1/v/$2"],[/(http:\/\/video.google.com)\/videoplay\?docid=([^&]+)/,"$1/googleplayer.swf?docId=$2"],[/(http:\/\/vimeo\.[a-z]+)\/([0-9]+).*?/,
"$1/moogaloop.swf?clip_id=$2"]],i18n:{Clear:"Clear",Save:"Save",Source:"Source",Bold:"Bold",Italic:"Italic",Underline:"Underline",Strike:"Strike through",Ttext:"Typetext",Header:"Header",Cut:"Cut",Copy:"Copy",Paste:"Paste",Left:"Left",Center:"Center",Right:"Right",Justify:"Justify",Undo:"Undo",Redo:"Redo",Code:"Code block",Quote:"Block quote",Link:"Add link",Image:"Insert image",Video:"Insert video",Dotlist:"List with dots",Numlist:"List with numbers",Indent:"Indent",Outdent:"Outdent",Forecolor:"Text color",
Backcolor:"Background color",Select:"Select",Remove:"Remove",Format:"Format",Fontname:"Font name",Fontsize:"Size",Subscript:"Subscript",Superscript:"Superscript",Symbol:"Special character",UrlAddress:"URL Address"},current:null},initialize:function(a,b){this.$super("rte",{}).setOptions(b,a).append(this.toolbar=new c.Toolbar(this),this.editor=new c.Editor(this),this.status=new c.Status(this));this.options.showToolbar||this.toolbar.hide();this.options.showStatus||this.status.hide();a&&this.assignTo(a);
this.undoer=new c.Undoer(this);this.selection=new c.Selection(this);this.exec("styleWithCss",false);this.status.update();this.undoer.save()},setValue:function(a){this.textarea&&this.textarea.value(a);this.editor.update(a);return this},getValue:function(){return this.editor._.innerHTML},value:function(a){return this[a===undefined?"getValue":"setValue"](a)},disable:function(){this.disabled=true;return this.addClass("rui-rte-disabled")},enable:function(){this.disabled=false;return this.removeClass("rui-rte-disabled")},
focus:function(){if(c.current!==this){c.current=this;this.editor.focus()}return this},blur:function(){c.current=null;this.editor.blur();return this},assignTo:function(a){var b=w(a);a=b.size();if(c.supported){this.insertTo(b.setStyle("visibility:hidden;position:absolute;z-index:-1;top:-9999px;left:-9999px;"),"before");this.editor.resize(a);this.setWidth(a.x);this.options.autoresize&&this.editor.setStyle({minHeight:a.y+"px",height:"auto"})}else b.setStyle("visibility:visible");this.setValue(b.value());
this.onChange(function(){b._.value=this.editor._.innerHTML});this.textarea=b;return this},exec:function(a,b){try{l.execCommand(a,false,b)}catch(d){if(a==="inserthtml")try{this.selection.get().pasteHTML=b}catch(e){}}return this}});c.Toolbar=new g(s,{initialize:function(a){this.$super("div",{"class":"rui-rte-toolbar"});this.rte=a;a.tools={};a.shortcuts={};var b=a.options.toolbar;h(c.Toolbars[b]||(isArray(b)?b:[b])).each(function(d){var e=n("div",{"class":"line"}).insertTo(this);h(d.split("|")).each(function(f){if(!h(f).blank()){var j=
n("div",{"class":"bar"}).insertTo(e);h(f.split(" ")).each(function(i){i=h(i).capitalize();i in c.Tools&&j.insert(new c.Tools[i](a))})}})},this)}});c.Editor=new g(s,{initialize:function(a){this.$super(a.append('<div contenteditable="true" class="rui-rte-editor"></div>').first("div.rui-rte-editor")._);this.rte=a;this.on({focus:this._focus,blur:this._blur,mouseup:this._mouseup,keydown:this._keydown,keyup:this._keyup})},update:function(a){this.$super(a);return this},focus:function(){this._.focus();return this},
blur:function(){this._.blur();return this},removeElement:function(a){if(a!==null){for(var b=a.parentNode;a.firstChild;)b.insertBefore(a.firstChild,a);b.removeChild(a)}},_focus:function(){this.rte.selection.restore();this.rte.status.update();this.rte.focused=true},_blur:function(){this.rte.focused=false;this.rte.status.update()},_mouseup:function(){this._focus()},_keydown:function(a){var b=a._,d=b.keyCode,e;if(b.metaKey||b.ctrlKey)if(e=this.rte.shortcuts[d]){e.block&&a.stop();e.call()}else if(d===
90){a.stop();this.rte.undoer[b.shiftKey?"redo":"undo"]()}},_keyup:function(a){if(a.keyCode in this._keys)this._focus();else{this._timer&&q.clearTimeout(this._timer);var b=this.rte,d=this._;this._timer=q.setTimeout(function(){if(b.__old_value!==d.innerHTML){b.__old_value=d.innerHTML;b.fire("change")}},400)}},_timer:false,_keys:{37:true,38:true,39:true,40:true,13:true}});c.Status=new g(s,{initialize:function(a){this.$super("div",{"class":"rui-rte-status"});this.rte=a;this.nodes=[];this.tags=[];this.onMousedown(this._mousedown)},
update:function(){this._findNodes();this._checkTools();return this.$super(this.nodes.map(function(a,b){var d=a.tagName.toLowerCase();if(a.id)d+="#"+a.id;return'<a href="" data-index="'+b+'" onclick="return false;" title="'+c.i18n.Select+'">'+d+"</a>"}).join(" &rsaquo; "))},findElement:function(a,b){if(a)for(var d=this.nodes.length-1,e,f;d>-1;d--)if(this.nodes[d].tagName===a){f=true;for(e in b)f&=b[e]instanceof o?b[e].test(this.nodes[d].getAttribute(e)):this.nodes[d].getAttribute(e)==b[e];if(f)return this.nodes[d]}return null},
_checkTools:function(){var a=this.rte.tools,b;for(b in a)a[b].check()},_findNodes:function(){var a=this.rte.selection.node(),b=this.rte.editor._,d=this.rte._,e=[],f=[];this.nodes=[];for(this.tags=[];a&&a!==d;){if(a.tagName){e.unshift(a);f.unshift(a.tagName)}a=a.parentNode;if(a===b){this.nodes=e;this.tags=f;break}}},_mousedown:function(a){var b=a.target;if(b._.tagName==="A"){a.stop();this.rte.selection.wrap(this.nodes[b.get("data-index").toInt()])}}});c.Undoer=new g({initialize:function(a){this.rte=
a;this.rte.on("change",h(this.save).bind(this));this.clear()},clear:function(){this.stash=[];this.index=-1},hasUndo:function(){return this.stash.length>0&&this.index>0},hasRedo:function(){return this.stash.length-this.index>1},undo:function(){this.hasUndo()&&this.set(--this.index)},redo:function(){this.hasRedo()&&this.set(++this.index)},set:function(){if(this.stash[this.index]){this.rte.editor._.innerHTML=this.stash[this.index];this.rte.selection.restore()}},save:function(a){a=a?a.tool:a;var b=this.rte.editor._.innerHTML;
if((!a||a!==this.rte.tools.Undo&&a!==this.rte.tools.Redo)&&this.stash[this.index]!==b){this.stash.length=this.index+1;this.stash.push(b);this.index=this.stash.length-1;this.rte.tools.Undo&&this.rte.tools.Undo.check();this.rte.tools.Redo&&this.rte.tools.Redo.check()}}});c.Selection=new g({initialize:function(a){this.rte=a},get:function(){try{return q.getSelection().getRangeAt(0)}catch(a){try{return l.selection.createRange()}catch(b){var d=q.getSelection(),e=l.createRange();if(d.focusNode){e.setStart(d.anchorNode,
d.anchorOffset);e.setEnd(d.focusNode,d.focusOffset)}return e}}},set:function(a){if(a.select)a.select();else{var b=q.getSelection();b.removeAllRanges();b.addRange(a)}},save:function(){function a(e){var f=[],j=false,i=b[e+"Container"];for(e=b[e+"Offset"];i.parentNode;)if(i===d){j=true;break}else{f.push(e);for(var k=0;k<i.parentNode.childNodes.length;k++)if(i.parentNode.childNodes[k]===i){e=k;break}i=i.parentNode}return j?f:[]}var b=this.get(),d=this.rte.editor._.parentNode;return this.mark=[a("start"),
a("end")]},restore:function(a){function b(j,i){for(var k=d,t=i.shift(),m=i.length-1;m>-1;m--)if(!(k.tagName&&(k=k.childNodes[i[m]])))break;k&&k!==d&&e[j](k,t)}a=a||this.mark;var d=this.rte.editor._,e=l.selection?l.selection.createRange():l.createRange();if(a)try{b("setStart",a[0]);b("setEnd",a[1]);this.set(e)}catch(f){}},node:function(){var a=this.get(),b;if(a.startContainer){b=a.commonAncestorContainer;if(!a.collapsed)if(a.startContainer==a.endContainer&&a.startOffset-a.endOffset<2&&a.startContainer.hasChildNodes())b=
a.startContainer.childNodes[a.startOffset];b=b&&b.nodeType===3?b.parentNode:b}else b=a.item?a.item(0):a.parentElement();return b},wrap:function(a){var b=this.get();if(b.setStart){b.selectNode(a);this.set(b)}},text:function(){var a=this.get();return""+(a.text?a.text:a)},empty:function(){return this.text()==""},html:function(){var a=this.get(),b;if(a.htmlText)return a.htmlText;else{b=l.createElement("div");for(a=a.cloneContents();a.firstChild;)b.appendChild(a.firstChild);return b.innerHTML}}});c.Tool=
new g(s,{shortcut:false,block:true,blip:false,changes:true,initialize:function(a){for(var b in c.Tools)if(c.Tools[b]===this.constructor)break;this.name=b;this.$super("div",{html:'<div class="icon"></div>',"class":"tool "+b.toLowerCase(),title:(c.i18n[b]||b)+(this.shortcut?" ("+this.shortcut+")":"")});this.rte=a;a.tools[b]=this;if(this.shortcut)a.shortcuts[this.shortcut.toUpperCase().charCodeAt(0)]=this;this.onMousedown(function(d){d.stop();this.mousedown()});return this},exec:function(){},active:function(){return false},
enabled:function(){return true},call:function(){if(!this.disabled){this.exec();this.rte.status.update();this.rte.fire("change",{tool:this});this.blip&&this.highlight()}},check:function(){this._.className=this._.className.replace(" disabled","");this.disabled=false;if((this.name==="Source"||this.rte.srcMode!==true)&&this.enabled()){this._.className=this._.className.replace(" active","");if(this.active())this._.className+=" active"}else{this._.className+=" disabled";this.disabled=true}},highlight:function(){h(this.addClass("highlight").removeClass).bind(this,
"highlight").delay(100)},mousedown:function(){this.call()}});c.Tool.Command=new g(c.Tool,{command:null,value:null,exec:function(){this.rte.exec(this.command,this.value)},enabled:function(){try{return l.queryCommandEnabled(this.command)}catch(a){return false}},active:function(){try{return this.value===null?l.queryCommandState(this.command):l.queryCommandValue(this.command)==this.value}catch(a){return false}}});c.Tool.Format=new g(c.Tool,{tag:null,atts:{},initialize:function(a){this.$super(a);this.tag=
(this.tag||c.Tags[this.name]||"").toUpperCase();return this},exec:function(){this[this.active()?"unformat":"format"]()},active:function(){return this.element()!==null},element:function(){return this.rte.status.findElement(this.tag,this.attrs)},unformat:function(){this._format(false)},format:function(){this._format(true)},_format:function(a){function b(k){function t(z,u){u.nextSibling?u.parentNode.insertBefore(z,u.nextSibling):u.parentNode.appendChild(z)}var m=f[k+"Container"],p=f[k+"Offset"],A=m.parentNode,
r=l.createElement("span");r.setAttribute("rrte-"+k,"1");if(p===0)A.insertBefore(r,k==="start"&&p===f.endOffset&&m===f.endContainer?m.previousSibling:m);else if(v?p===v.length:p===m.childNodes.length)t(r,m);else if(m.nodeType===3){var v=m.nodeValue;k=l.createTextNode(v.substr(p));m.nodeValue=v.substr(0,p);t(k,m);A.insertBefore(r,k)}else m.insertBefore(r,m.childNodes[p])}var d="<"+this.tag,e="</"+this.tag+">",f=this.rte.selection.get(),j=this.rte.editor._;for(var i in this.attrs)d+=" "+i+'="'+this.attrs[i]+
'"';d+=">";f={startContainer:f.startContainer,startOffset:f.startOffset,endContainer:f.endContainer,endOffset:f.endOffset};b("end");b("start");j.innerHTML=a?j.innerHTML.replace('<span rrte-start="1"></span>',d+'<span rrte-start="1"></span>').replace('<span rrte-end="1"></span>','<span rrte-end="1"></span>'+e):j.innerHTML.replace('<span rrte-start="1"></span>',e+'<span rrte-start="1"></span>').replace('<span rrte-end="1"></span>','<span rrte-end="1"></span>'+d).replace(new o(o.escape(d+e),"ig"),"");
a=y(j.getElementsByTagName("span"));f=this.rte.selection.get();for(d=0;d<a.length;d++)if(e=a[d].getAttribute("rrte-start")?"setStart":a[d].getAttribute("rrte-end")?"setEnd":false){j=a[d].parentNode;i=y(j.childNodes).indexOf(a[d]);j.removeChild(a[d]);f[e](j,i)}this.rte.selection.set(f)}});c.Tool.Options={build:function(a){this.trigger=n("div",{"class":"trigger",html:"&middot;"});this.display=n("div",{"class":"display"});this.options=n("ul",{"class":"options"});this.addClass("with-options").append(this.display,
this.options).insert(this.trigger,"top");this.items={};for(var b in a){this.items[b]=n("li").insert(a[b]);this.items[b].insertTo(this.options).value=b}this.items[""]=n("li",{"class":"remove",html:"--",title:c.i18n.Remove});this.items[""].insertTo(this.options,"top").value="";this.options.onMousedown(h(this.pick).bind(this));var d=h(this.options.hide).bind(this.options,null);w(l).on({mousedown:d,keydown:function(e){e.keyCode===27&&d()}});this.value="";this.updateDisplay(null);return this},pick:function(a){a=
a.stop().target;if(a._.tagName!=="LI")a=a.parent("LI");if(a.value!==undefined){this.options.hide();this.value=a.value;this.updateDisplay(this.value||null);this.markActive();this.exec()}},mousedown:function(){if(!this.disabled){x(".rui-rte-toolbar div.with-options ul.options").without(this.options).each("hide");this.options.hidden()&&this.value!==null&&this.markActive();this.options.toggle("fade",{duration:"short"})}},markActive:function(){for(var a in this.items)this.items[a][a===this.value?"addClass":
"removeClass"]("active")},updateDisplay:function(a){this.display.update(a!==null&&a in this.items?this.items[a].text():this._.title)}};c.Tool.Style=new g(c.Tool.Format,{include:c.Tool.Options,tag:"span",style:null,initialize:function(a,b){this.re=new o("(^|;)\\s*"+o.escape(this.style+":")+"\\s*(.+?)\\s*(;|$)");this.attrs={style:this.re};this.$super(a).build(b);return this},exec:function(){if(this.active()){this.attrs={style:this.style+":"+this._value};this.unformat()}if(this.value){this.attrs={style:this.style+
":"+this.value};this.format()}this.attrs={style:this.re}},active:function(){var a=false,b=null;if(this.element()!==null){this._value=b=this.getStyleValue();a=true}this.updateDisplay(b);return a},getStyleValue:function(){var a=this.element();a=a!==null?a.getAttribute("style"):null;if(a!==null)if((a=a.match(this.re))!==null)a=a[2];return a}});c.Tool.Color=new g(c.Tool.Style,{extend:{COLORS:h(["000000 444444 666666 999999 cccccc eeeeee f4f4f4 ffffff","f24020 f79c33 fff84c 6af244 5ef9fd 0048f7 8950f7 ee5ff8",
"e39e9b f5cba1 fee3a1 bcd3ab a6c3c8 a2c6e5 b1abd3 d0aabc d77169 f1b374 fdd675 9cbe83 7ca4ae 74aad8 8983bf bb839f cc0100 e79138 f1c332 69a84f 45818e 3d85c6 674ea7 a64d79 990000 b45f05 bf9000 38761c 134f5c 0b5394 351b75 751a47 660000 783e03 7f6000 264e13 0b333d 063763 1f124c 4c1030"])},initialize:function(a){this.$super(a,{}).addClass("color");this.display.clean();c.Tool.Color.COLORS.each(function(b){var d=n("li",{"class":"group"}),e=n("ul").insertTo(d);b=b.split(" ");for(var f=0,j,i;f<b.length;f++){j=
"#"+b[f];for(i=("ffffff".toInt(16)-b[f].toInt(16)).toString(16);i.length<6;)i+="0";this.items[j]=n("li",{html:"&bull;",style:{background:j,color:"#"+i}});this.items[j].insertTo(e).value=j}this.options.append(d)},this);return this},getStyleValue:function(){var a=this.$super(),b;if(a!==null)if(b=/^#(\w)(\w)(\w)$/.exec(a))a="#"+b[1]+b[1]+b[2]+b[2]+b[3]+b[3];else if(b=/^\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)\s*$/.exec(a))a="#"+h(b.slice(1)).map(function(d){d=(d-0).toString(16);return d.length===1?"0"+d:d}).join("");
return a},updateDisplay:function(a){this.display._.style.background=a===null?"transparent":a}});c.Tool.Url=new g(c.Tool,{attr:null,exec:function(a){if(a===undefined)this.prompt();else a?this[this.element()?"url":"create"](a):this.rte.editor.removeElement(this.element())},active:function(){return this.element()!==null},prompt:function(){var a=prompt(c.i18n.UrlAddress,this.url()||"http://some.url.com");a!==null&&this.exec(a)},url:function(a){if(this.element())if(a!==undefined)this.element()[this.attr]=
a;else return this.element()[this.attr]},create:function(a){this.rte.exec(this.command,a)}});c.Tools.Bold=new g(c.Tool.Format,{shortcut:"B",tag:"B"});c.Tools.Italic=new g(c.Tool.Format,{shortcut:"I",tag:"I"});c.Tools.Underline=new g(c.Tool.Format,{shortcut:"U"});c.Tools.Strike=new g(c.Tool.Format,{});c.Tools.Cut=new g(c.Tool.Command,{shortcut:"X",command:"cut",block:false,blip:true});c.Tools.Copy=new g(c.Tools.Cut,{shortcut:"C",command:"copy"});c.Tools.Paste=new g(c.Tools.Cut,{shortcut:"V",command:"paste"});
c.Tools.Left=new g(c.Tool.Command,{command:"justifyleft"});c.Tools.Center=new g(c.Tool.Command,{command:"justifycenter"});c.Tools.Right=new g(c.Tool.Command,{command:"justifyright"});c.Tools.Justify=new g(c.Tool.Command,{command:"justifyfull"});c.Tools.Undo=new g(c.Tool,{shortcut:"Z",blip:true,exec:function(){this.rte.undoer.undo()},enabled:function(){return this.rte.undoer.hasUndo()}});c.Tools.Redo=new g(c.Tool,{blip:true,exec:function(){this.rte.undoer.redo()},enabled:function(){return this.rte.undoer.hasRedo()}});
c.Tools.Code=new g(c.Tool.Format,{tag:"PRE"});c.Tools.Quote=new g(c.Tool.Format,{});c.Tools.Ttext=new g(c.Tool.Format,{shortcut:"T"});c.Tools.Header=new g(c.Tool.Format,{tag:"H2"});c.Tools.Link=new g(c.Tool.Url,{shortcut:"L",command:"createlink",attr:"href",enabled:function(){return!this.rte.selection.empty()||this.active()},element:function(){return this.rte.status.findElement("A",{})}});c.Tools.Image=new g(c.Tool.Url,{command:"insertimage",attr:"src",element:function(){var a=this.rte.selection.node();
return a!==null&&a.tagName==="IMG"?a:null}});c.Tools.Video=new g(c.Tool.Url,{command:"inserthtml",enabled:function(){return true},element:function(){return this.rte.status.findElement("OBJECT",{})},url:function(a){var b=this.element()&&this.element().getElementsByTagName("embed")[0];if(b)if(a!==undefined)b.src=this.swfUrl(a);else return b.src},create:function(a){a=this.swfUrl(a);var b='width="'+this.rte.options.videoSize.split("x")[0]+'" height="'+this.rte.options.videoSize.split("x")[1]+'"';this.$super("<object "+
b+'><param name="src" value="'+a+'" /><embed src="'+a+'" type="application/x-shockwave-flash" '+b+" /></object>")},swfUrl:function(a){return h(c.Videos).map(function(b){return a.match(b[0])?a.replace(b[0],b[1]):null}).compact()[0]||a}});c.Tools.Dotlist=new g(c.Tool.Command,{command:"insertunorderedlist"});c.Tools.Numlist=new g(c.Tool.Command,{command:"insertorderedlist"});c.Tools.Indent=new g(c.Tool.Command,{command:"indent"});c.Tools.Outdent=new g(c.Tool.Command,{command:"outdent"});c.Tools.Forecolor=
new g(c.Tool.Color,{style:"color"});c.Tools.Backcolor=new g(c.Tool.Color,{style:"background-color"});c.Tools.Source=new g(c.Tool,{shortcut:"E",source:false,exec:function(){this[this.rte.srcMode?"showPreview":"showSource"]();this.rte.srcMode=!this.rte.srcMode},active:function(){return this.rte.srcMode},showPreview:function(){this.rte.editor.setStyle("visibility:visible");if(this.source){this.rte.value(this.source.value());this.source.remove()}this.rte.editor.focus()},showSource:function(){this.rte.editor.setStyle("visibility:hidden;");
(this.source=this.source||n("textarea",{"class":"rui-rte-source"})).insertTo(this.rte.editor,"before").resize(this.rte.editor.size()).setValue(""+this.rte.value()).focus();this.rte.focused=true;this.rte.status.update();for(var a in this.rte.tools)this.rte.tools[a]!==this&&this.rte.tools[a].addClass("disabled")}});c.Tools.Clear=new g(c.Tool,{exec:function(){this.rte.exec("selectall");this.rte.exec("delete")}});c.Tools.Save=new g(c.Tool,{shortcut:"S",initialize:function(a){this.$super(a);if(!(a.textarea&&
a.textarea._.form)){this.disabled=true;this.addClass("disabled")}},exec:function(){this.disabled||this.rte.textarea.form().submit()},check:function(){}});c.Tools.Format=new g(c.Tool.Format,{include:c.Tool.Options,initialize:function(a){var b={},d,e,f;this.formats={};for(d in c.Formats)if(f=d.match(/^([a-z0-9]+)(\.([a-z0-9_\-]+))?$/)){e=f[1];this.formats[d]={tag:e.toUpperCase(),attrs:{},match:{}};if(f[3]){this.formats[d].attrs["class"]=f[3];this.formats[d].match["class"]=new o("(^|\\s+)"+o.escape(f[3])+
"(\\s+|$)")}b[d]="<"+e+' class="'+f[3]+'">'+c.Formats[d]+"</"+e+">"}this.$super(a).build(b);return this},exec:function(){if(this.active()&&this.rule){this.tag=this.formats[this.rule].tag;this.attrs=this.formats[this.rule].attrs;this.unformat()}if(this.value&&this.formats[this.value]){this.tag=this.formats[this.value].tag;this.attrs=this.formats[this.value].attrs;this.format()}},active:function(){var a=this.element()!==null;this.updateDisplay(this.rule);return a},element:function(){var a,b,d=this.rte.status;
for(a in this.formats){b=d.findElement(this.formats[a].tag,this.formats[a].match);if(b!==null){this.rule=a;return b}}return this.rule=null}});c.Tools.Fontname=new g(c.Tool.Style,{style:"font-family",initialize:function(a){var b={},d,e=c.FontNames;for(d in e)b[e[d]]='<div style="font-family:'+e[d]+'">'+d+"</div>";return this.$super(a,b)}});c.Tools.Fontsize=new g(c.Tool.Style,{style:"font-size",initialize:function(a){for(var b={},d=0,e=c.FontSizes.split(/\s+/);d<e.length;d++)b[e[d]]='<div style="font-size:'+
e[d]+'">'+e[d]+"</div>";return this.$super(a,b)}});c.Tools.Subscript=new g(c.Tool.Command,{command:"subscript"});c.Tools.Superscript=new g(c.Tool.Command,{command:"superscript"});w(l).onReady(function(){x(c.Options.cssRule).each("getRich")});Input.include({getRich:function(a){if(this._.type==="textarea"&&!this.rte)this.rte=new c(this,a);return this.rte}});l.write('<style type="text/css">div.rui-rte,div.rui-rte-toolbar,div.rui-rte-toolbar *,div.rui-rte-editor,div.rui-rte-status,div.rui-rte-status *{margin:0;padding:0;background:none;border:none;width:auto;height:auto}textarea[data-rte]{visibility:hidden}div.rui-rte{display:inline-block; *display:inline; *zoom:1;position:relative}div.rui-rte-toolbar{padding:5px;background:#eee;border-radius:.25em .25em 0 0;-moz-border-radius:.25em .25em 0 0;-webkit-border-radius:.25em .25em 0 0;border:1px solid #ccc;border-bottom:none}div.rui-rte-toolbar div.line{display:inline-block; *display:inline; *zoom:1;margin-bottom:1px}div.rui-rte-toolbar div.bar{display:inline-block; *display:inline; *zoom:1;margin-right:2px}div.rui-rte-toolbar div.tool{display:inline-block; *display:inline; *zoom:1;margin-right:1px;vertical-align:middle;position:relative;cursor:pointer;border:1px solid #bbb;background-image:url(/images/rightjs-ui/rte-buttons.png);background-position:left center;background-color:#fff;border-radius:.25em;-moz-border-radius:.25em;-webkit-border-radius:.25em}div.rui-rte-toolbar div.tool:hover{background-color:#ddd;border-color:#777}div.rui-rte-toolbar div.disabled,div.rui-rte-toolbar div.disabled:hover{opacity:.4;filter:alpha(opacity=40);background-image:url(/images/rightjs-ui/rte-buttons.png);background-position:right center;background-color:#eee;border-color:#aaa;cursor:default}div.rui-rte-toolbar div.active{background-image:url(/images/rightjs-ui/rte-buttons.png);background-position:center center;background-color:#eee;border-color:#666;box-shadow:#aaa .025em .025em .5em;-moz-box-shadow:#aaa .025em .025em .5em;-webkit-box-shadow:#aaa .025em .025em .5em}div.rui-rte-toolbar div.highlight{background-color:#BBB;border-color:#666}div.rui-rte-toolbar div.icon{height:20px;width:20px;background-image:url(/images/rightjs-ui/rte.png);background-repeat:no-repeat;background-position:20px 20px}div.rui-rte-toolbar div.save div.icon{background-position:0px 0px}div.rui-rte-toolbar div.clear div.icon{background-position:-20px 0px}div.rui-rte-toolbar div.source div.icon{background-position:-40px 0px}div.rui-rte-toolbar div.bold div.icon{background-position:0px -20px}div.rui-rte-toolbar div.italic div.icon{background-position:-20px -20px}div.rui-rte-toolbar div.underline div.icon{background-position:-40px -20px}div.rui-rte-toolbar div.strike div.icon{background-position:-60px -20px}div.rui-rte-toolbar div.cut div.icon{background-position:0px -40px}div.rui-rte-toolbar div.copy div.icon{background-position:-20px -40px}div.rui-rte-toolbar div.paste div.icon{background-position:-40px -40px}div.rui-rte-toolbar div.left div.icon{background-position:0px -60px}div.rui-rte-toolbar div.center div.icon{background-position:-20px -60px}div.rui-rte-toolbar div.right div.icon{background-position:-40px -60px}div.rui-rte-toolbar div.justify div.icon{background-position:-60px -60px}div.rui-rte-toolbar div.undo div.icon{background-position:0px -80px}div.rui-rte-toolbar div.redo div.icon{background-position:-20px -80px}div.rui-rte-toolbar div.quote div.icon{background-position:0px -100px}div.rui-rte-toolbar div.code div.icon{background-position:-20px -100px}div.rui-rte-toolbar div.ttext div.icon{background-position:-40px -100px}div.rui-rte-toolbar div.header div.icon{background-position:-60px -100px}div.rui-rte-toolbar div.image div.icon{background-position:0px -120px}div.rui-rte-toolbar div.link div.icon{background-position:-20px -120px}div.rui-rte-toolbar div.video div.icon{background-position:-40px -120px}div.rui-rte-toolbar div.dotlist div.icon{background-position:0px -140px}div.rui-rte-toolbar div.numlist div.icon{background-position:-20px -140px}div.rui-rte-toolbar div.indent div.icon{background-position:-40px -140px}div.rui-rte-toolbar div.outdent div.icon{background-position:-60px -140px}div.rui-rte-toolbar div.forecolor div.icon{background-position:0px -160px}div.rui-rte-toolbar div.backcolor div.icon{background-position:-20px -160px}div.rui-rte-toolbar div.symbol div.icon{background-position:0px -180px}div.rui-rte-toolbar div.subscript div.icon{background-position:-20px -180px}div.rui-rte-toolbar div.superscript div.icon{background-position:-40px -180px}div.rui-rte-toolbar div.with-options{padding-right:8px}div.rui-rte-toolbar div.with-options div.trigger{position:absolute;right:0;height:100%;width:7px;text-align:center;background:#ccc;border-left:1px solid #bbb}div.rui-rte-toolbar div.bar div:hover div.trigger,div.rui-rte-toolbar div.bar div.active div.trigger{background:#aaa;border-color:#888}div.rui-rte-toolbar div.with-options div.icon{display:none}div.rui-rte-toolbar div.with-options div.display{display:block;line-height:20px;padding:0 6px;margin:0;color:#222;font-size:12px;background:#f8f8f8}div.rui-rte-toolbar div.with-options ul.options,div.rui-rte-toolbar div.with-options ul.options li{list-style:none;margin:0;padding:0}div.rui-rte-toolbar div.with-options ul.options{display:none;cursor:default;position:absolute;margin-bottom:1px;margin-left:-1px;background:#fff;border:1px solid #aaa;border-radius:.25em;-moz-border-radius:.25em;-webkit-border-radius:.25em;box-shadow:#bbb .1em .1em .25em;-moz-box-shadow:#bbb .1em .1em .25em;-webkit-box-shadow:#bbb .1em .1em .25em}div.rui-rte-toolbar div.with-options ul.options li{padding:.2em .5em;white-space:nowrap;cursor:pointer}div.rui-rte-toolbar div.with-options ul.options li:hover{background-color:#eee}div.rui-rte-toolbar div.with-options ul.options li> *{margin:0;padding:0;border:none;position:static}div.rui-rte-toolbar div.color div.icon{display:block}div.rui-rte-toolbar div.color ul.options{padding-bottom:.5em}div.rui-rte-toolbar div.color ul.options li.group,div.rui-rte-toolbar div.color ul.options li.group:hover{background:none}div.rui-rte-toolbar div.color ul.options li.group ul{width:144px;clear:both;padding-top:.5em}div.rui-rte-toolbar div.color ul.options li.group ul li{float:left;width:16px;height:16px;line-height:16px;font-size:80%;text-align:center;text-indent:-9999em;padding:0;cursor:pointer;border:1px solid transparent}div.rui-rte-toolbar div.color ul.options li.group ul li:hover,div.rui-rte-toolbar div.color ul.options li.group ul li.active{background:none;border-color:#444;border-radius:.1em;-moz-border-radius:.1em;-webkit-border-radius:.1em}div.rui-rte-toolbar div.color ul.options li.group ul li.active{text-indent:0}div.rui-rte-toolbar div.color div.display{position:absolute;text-indent:-9999em;bottom:2px;left:3px;margin:0;padding:0;width:14px;height:4px;border-radius:.1em;-moz-border-radius:.1em;-webkit-border-radius:.1em}div.rui-rte-toolbar div.color ul.options li.group ul li.none{border-color:#444}div.rui-rte-toolbar div.color ul.options li.group ul li.label,div.rui-rte-toolbar div.color ul.options li.group ul li.label:hover{text-indent:0;border:none;margin-left:.5em;font-size:1em;cursor:default}div.rui-rte-editor{outline:none;outline:hidden;padding:.1em .3em;overflow:auto;background:white;border:1px solid #ccc}div.rui-rte-editor:focus{border-color:#aaa}div.rui-rte-editor> *:first-child{margin-top:0}div.rui-rte-editor> *:last-child{margin-bottom:0}div.rui-rte textarea.rui-rte-source{position:absolute}div.rui-rte-status{height:1.4em;padding:0 .5em;color:#888;background:#eee;border:1px solid #ccc;border-top:none;border-radius:0 0 .25em .25em;-moz-border-radius:0 0 .25em .25em;-webkit-border-radius:0 0 .25em .25em}</style>');
return c}(RightJS,document,window);
