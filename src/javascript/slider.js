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