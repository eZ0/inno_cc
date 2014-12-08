$( document ).ready(function() {
    console.log( "ready!" );
    //1. set ul width 
    //2. image when click prev/next button
    var ul;
    var li_items;
    var imageNumber;
    var imageWidth;
    var sliderWidth;
    var prev, next;
    var currentPostion = 0;
    var currentImage = 0;


    function init(){
    	ul = document.getElementById('slider');
    	li_items = ul.children;
    	imageNumber = li_items.length;
    	imageWidth = li_items[0].children[0].clientWidth;
    	sliderWidth = 311;
    	// ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
    	prev = document.getElementById("prev");
    	next = document.getElementById("next");

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

    function slideTo(imageToGo){
    	var direction;
    	var numOfImageToGo = Math.abs(imageToGo - currentImage);
    	// slide left

    	direction = currentImage > imageToGo ? 1 : -1;
    	console.log(direction);
    	currentPostion = -1 * currentImage * sliderWidth;
    	var opts = {
    		duration:800,
    		delta:function(p){return p;},
    		step:function(delta){
    			ul.style.top = parseInt(currentPostion + direction * delta * sliderWidth * numOfImageToGo) + 'px';
    		},
    		callback:function(){currentImage = imageToGo;}	
    	};
    	animate(opts);
    }

    function onClickPrev(){
    	if (currentImage == 0){
    		slideTo(imageNumber - 1);
    	} 		
    	else{
    		slideTo(currentImage - 1);
    	}		
    }

    function onClickNext(){
    	if (currentImage == imageNumber - 1){
    		slideTo(0);
    	}		
    	else{
    		slideTo(currentImage + 1);
    	}		
    }

    window.onload = init;

    var changeClass = function (r, className1, className2, element) {

        var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");

        if( regex.test(r.className) ) {
            r.className = r.className.replace(regex,' '+className2+'');
            document.getElementById(element).style.display = 'none';
        }
        else{
            r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),' '+className1+' ');
            document.getElementById(element).style.display = 'block';
        }
        return r.className;
    };


    document.getElementById('menu-icon').onclick = function() {
        changeClass(this, 'menu-icon active', 'menu-icon', 'menu');
    };
});
