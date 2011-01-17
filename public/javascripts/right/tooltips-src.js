/**
 * The tooltips feature for RightJS
 * See http://rightjs.org/ui/tooltips
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
var Tooltip = RightJS.Tooltip = (function(document, RightJS) {
/**
 * This module defines the basic widgets constructor
 * it creates an abstract proxy with the common functionality
 * which then we reuse and override in the actual widgets
 *
 * Copyright (C) 2010-2011 Nikolay Nemshilov
 */

/**
 * The tooltips initialization script
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
var R  = RightJS,
    $  = RightJS.$,
    $w = RightJS.$w,
    $uid = RightJS.$uid,
    Element = RightJS.Element;




/**
 * The widget units constructor
 *
 * @param String tag-name or Object methods
 * @param Object methods
 * @return Widget wrapper
 */
function Widget(tag_name, methods) {
  if (!methods) {
    methods = tag_name;
    tag_name = 'DIV';
  }

  /**
   * An Abstract Widget Unit
   *
   * Copyright (C) 2010 Nikolay Nemshilov
   */
  var AbstractWidget = new RightJS.Class(RightJS.Element.Wrappers[tag_name] || RightJS.Element, {
    /**
     * The common constructor
     *
     * @param Object options
     * @param String optional tag name
     * @return void
     */
    initialize: function(key, options) {
      this.key = key;
      var args = [{'class': 'rui-' + key}];

      // those two have different constructors
      if (!(this instanceof RightJS.Input || this instanceof RightJS.Form)) {
        args.unshift(tag_name);
      }
      this.$super.apply(this, args);

      if (RightJS.isString(options)) {
        options = RightJS.$(options);
      }

      // if the options is another element then
      // try to dynamically rewrap it with our widget
      if (options instanceof RightJS.Element) {
        this._ = options._;
        if ('$listeners' in options) {
          options.$listeners = options.$listeners;
        }
        options = {};
      }
      this.setOptions(options, this);

      return (RightJS.Wrapper.Cache[RightJS.$uid(this._)] = this);
    },

  // protected

    /**
     * Catches the options
     *
     * @param Object user-options
     * @param Element element with contextual options
     * @return void
     */
    setOptions: function(options, element) {
      element = element || this;
      RightJS.Options.setOptions.call(this,
        RightJS.Object.merge(options, eval("("+(
          element.get('data-'+ this.key) || '{}'
        )+")"))
      );
      return this;
    }
  });

  /**
   * Creating the actual widget class
   *
   */
  var Klass = new RightJS.Class(AbstractWidget, methods);

  // creating the widget related shortcuts
  RightJS.Observer.createShortcuts(Klass.prototype, Klass.EVENTS || []);

  return Klass;
}


/**
 * The native tooltips feature for RithJS
 *
 * Copyright (C) 2009-2011 Nikolay Nemshilov
 */
var Tooltip = new Widget({
  extend: {
    version: '2.2.0',

    EVENTS: $w('show hide'),

    Options: {
      cssRule:    '[data-tooltip]', // a css-marker of an element with a tooltip

      fxName:     'fade',           // the appearance effect name
      fxDuration: 400,              // the appearance effect duration
      delay:      400,              // the appearance delay

      move:       true,             // if it should be moved with the mouse

      idSuffix:   '-tooltip'        // ID prefix for tooltips with ID
    },

    current:   null,  // the currently active tooltip reference
    instances: R([]), // keeps the list of instances

    // tries to find a tip closest to the event
    find: function(event) {
      var element = event.target;

      if (element.match(Tooltip.Options.cssRule)) {
        var uid = $uid(element);
        return (Tooltip.instances[uid] || (Tooltip.instances[uid] = new Tooltip(element)));
      }
    }
  },

  /**
   * Constructor
   *
   * @param Element associated element
   * @param Object options
   */
  initialize: function(element, options) {
    this.associate = element = $(element);

    this
      .$super('tooltip')
      .setOptions(options, element)
      .insert('<div class="rui-tooltip-arrow"></div>'+
        '<div class="rui-tooltip-container">'+
          (element.get('title') || element.get('alt'))+
        '</div>'
      )
      .on({
        mouseout:  this._mouseOut,
        mouseover: this._cancelTimer
      })
      .insertTo(document.body);

    // adding the ID if needed
    if (element.has('id')) {
      this.set('id', element.get('id') + this.options.idSuffix);
    }

    // removing the titles from the elment
    element.set({ title: '', alt: ''});
  },

  /**
   * Hides the tooltip
   *
   * @return Tooltip this
   */
  hide: function() {
    this._cancelTimer();

    this._timer = R(function() {
      Element.prototype.hide.call(this, this.options.fxName, {
        engine:   'javascript', // Webkit too slow in here
        duration: this.options.fxDuration,
        onFinish: R(function() {
          if (Tooltip.current === this) {
            Tooltip.current = null;
          }
        }).bind(this)
      });
      this.fire('hide');
    }).bind(this).delay(100);

    return this;
  },

  /**
   * Shows the tooltip with a dealy
   *
   * @param Boolean if true will show tooltip immediately
   * @return Tooltip this
   */
  show: function(immediately) {
    // hidding all the others
    Tooltip.instances.each(function(tip) {
      if (tip && tip !== this) { tip.hide(); }
    }, this);

    // show the tooltip with a delay
    this._timer = R(function() {
      Element.prototype.show.call(this.stop(),
        this.options.fxName, {
          engine: 'javascript', // webkit it too slow on that
          duration: this.options.fxDuration
        }
      );

      Tooltip.current = this.fire('show');
    }).bind(this).delay(this.options.delay);

    return (Tooltip.current = this);
  },

  /**
   * Moves it to where the event happened
   *
   * @return Tooltip this
   */
  moveToEvent: function(event) {
    if (this.options.move) {
      this._.style.left = event.pageX + 'px';
      this._.style.top  = event.pageY + 'px';
    }

    return this;
  },

// protected

  // cancels a show timeout
  _cancelTimer: function() {
    if (this._timer) {
      this._timer.cancel();
      this._timer = null;
    }
    return false;
  },

  _mouseOut: function(event) {
    event.stop();
    if (event.relatedTarget !== this.associate) {
      this.hide();
    }
  }
});


/**
 * The post load tooltips initialization script
 *
 * Copyright (C) 2009-2011 Nikolay Nemshilov
 */
$(document).on({
  /**
   * Watches all the mouse-over events and reacts if one of the targets
   * matches a tooltip
   *
   * @param Event event
   */
  mouseenter: function(event) {
    var tip = Tooltip.find(event);
    if (tip) {
      tip.show().moveToEvent(event);
    }
  },

  /**
   * Catches the mouseout events and hides tooltips when needed
   *
   * @param Event event
   */
  mouseleave: function(event) {
    var tip = Tooltip.find(event);

    if (tip) {
      tip.hide();
    }
  },

  /**
   * Moves tooltips when active
   *
   * @param Event event
   */
  mousemove: function(event) {
    var tip = Tooltip.current;
    if (tip !== null && tip.options.move) {
      tip.moveToEvent(event);
    }
  }
});
(function() {
        var style = document.createElement('style'),
            rules = document.createTextNode("div.rui-tooltip{display:none;position:absolute;z-index:99999;font-size:90%;margin-top:16pt;margin-left:5pt;color:#FFF;text-shadow:0 0 .2em #000;border:.3em solid rgba(255,255,255,0.2);background-color:rgba(25,25,25,0.92);background-color:#000 \\9; border:.3em solid #444 \\9; background-image:-webkit-gradient(linear,0% 0%,0% 100%,from(transparent) ,to(#000) );border-radius:.4em;-moz-border-radius:.4em;-webkit-border-radius:.4em;box-shadow:0 0 .4em #555;-moz-box-shadow:0 0 .4em #555;-webkit-box-shadow:0 0 .4em #555}div.rui-tooltip-container{margin:.4em .6em}");

        style.type = 'text/css';

        if(style.styleSheet) {
          style.styleSheet.cssText = rules.nodeValue;
        } else {
          style.appendChild(rules);
        }

        document.getElementsByTagName('head')[0].appendChild(style);
      })();

return Tooltip;
})(document, RightJS);
