$( document ).ready(function() {

	slide();

	var changeClass = function(r, className1, className2) {
		var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");

		console.log(r.className);

		if( regex.test(r.className) ) {
			r.className = r.className.replace(regex,''+className2+'');
			console.log('should change to none!');
			isDisplayed = false;
		//changeDisplayAttribute();
	}
	else{
		r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),''+className1+'');
		console.log('should change to block!');
		isDisplayed = true;
		//changeDisplayAttribute();
	}
	console.log(r.className);
	return r.className;
};

	// document.getElementById('menu-icon').onclick = function() {
	// 	changeClass(this, 'toggle-topbar menu-icon active', 'toggle-topbar menu-icon');
	// 	changeDisplayAttribute();
	// 	console.log(isDisplayed);
	// };

	var toggled = false;
	var el = document.getElementById('menu');
	var close_icon = document.getElementById('close-icon');
	var menu_icon =  document.getElementById('menu-icon');

	menu_icon.onclick = function() {
		if( toggled ) {
			el.style.height = "1500px";
			el.style.display = "block";
			close_icon.style.display = "inline-block";
			menu_icon.style.display = "none";
		} else {
			//el.style.height = "0px";
			el.style.display = "none";
		}
		toggled = !toggled;
	};
	close_icon.onclick = function() {
		el.style.height = "0px";
		el.style.display = "none";
		close_icon.style.display = "none";
		menu_icon.style.display = "inline-block";
	};

	document.getElementById('aside-nav').onclick = function() {
		$('#sidemenu').modal('toggle');
	};
	document.getElementById('sidemenu').onclick = function() {
		$('#sidemenu').modal('hide');
	};

});

/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

function slide(){
	console.log('wooot');
	//1. set ul width 
	//2. image when click prev/next button
	var ul;
	var li_items;
	var slideNumber;
	var slideWidth;
	var prev, next;
	var currentPostion = 0;
	var currentSlide = 0;


	function init(){
		ul = document.getElementById('slider');
		li_items = ul.children;
		slideNumber = li_items.length;
		slideWidth = li_items[0].children[0].clientWidth;
		ul.style.width = parseInt(slideWidth * slideNumber) + 'px';

		console.log(ul.style.width);
		
		prev = document.getElementById("prev");
		next = document.getElementById("next");
		//.onclike = slide(-1) will be fired when onload;
		/*
		prev.onclick = function(){slide(-1);};
		next.onclick = function(){slide(1);};*/
		prev.onclick = function(){ onClickPrev();};
		next.onclick = function(){ onClickNext();};
	}

	function animate(opts){
		var start = new Date;
		var id = setInterval(function(){
			var timePassed = new Date - start;
			var progress = timePassed / opts.duration;
			if (progress > 1){
				progress = 1;
			}
			var delta = opts.delta(progress);
			opts.step(delta);
			if (progress == 1){
				clearInterval(id);
				opts.callback();
			}
		}, opts.delay || 17);
		//return id;
	}

	function slideTo(slideToGo){
		var direction;
		var numOfSlideToGo = Math.abs(slideToGo - currentSlide);
		// slide toward left

		direction = currentSlide > slideToGo ? 1 : -1;
		currentPostion = -1 * currentSlide * slideWidth;
		var opts = {
			duration:1000,
			delta:function(p){return p;},
			step:function(delta){
				ul.style.left = parseInt(currentPostion + direction * delta * slideWidth * numOfSlideToGo) + 'px';
				console.log(currentPostion);
			},
			callback:function(){currentSlide = slideToGo;}	
		};
		animate(opts);
	}

	function onClickPrev(){
		console.log("clicked prev!");
		if (currentSlide == 0){
			slideTo(slideNumber - 1);
		} 		
		else{
			slideTo(currentSlide - 1);
		}		
	}

	function onClickNext(){
		console.log("clicked next!");
		if (currentSlide == slideNumber - 1){
			slideTo(0);
		}		
		else{
			slideTo(currentSlide + 1);
		}		
	}

	window.onload = init;
};