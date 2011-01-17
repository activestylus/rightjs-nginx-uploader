/**
 * Pretty keyboard events handler for RightJS
 * http://rightjs.org/plugins/keys
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
(function(a){a.Event.Keys={BACKSPACE:8,TAB:9,ENTER:13,ESC:27,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,INSERT:45,DELETE:46};var i=a.Element.prototype.on;a.Document.prototype.on=a.Element.prototype.on=a.Window.prototype.on=function(){var d=a.$A(arguments),c=d[0];if(typeof c==="string"){var b=c.split(/[\+\-\_ ]+/);b=(b[b.length-1]||"").toUpperCase();if(b in a.Event.Keys||/^[A-Z0-9]$/.test(b)){var j=/(^|\+|\-| )(alt|meta)(\+|\-| )/i.test(c),k=/(^|\+|\-| )(ctl|ctrl)(\+|\-| )/i.test(c),
l=/(^|\+|\-| )(shift)(\+|\-| )/i.test(c),m=a.Event.Keys[b]||b.charCodeAt(0),g=d.slice(1),e=g.shift();if(typeof e==="string")e=this[e]||function(){};d=["keydown",function(h){var f=h._;if(f.keyCode===m&&(!j||f.metaKey)&&(!k||f.ctrlKey)&&(!l||f.shiftKey))return e.call(this,[h].concat(g))}]}}return i.apply(this,d)}})(RightJS);
