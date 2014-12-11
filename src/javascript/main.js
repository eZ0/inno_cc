$( document ).ready(function() {

//slide();

//var el = document.getElementById('menu');
var isDisplayed;

var changeDisplayAttribute = function(){
	// if (isDisplayed) {
	// 	el.style.display = 'block';
	// 	//isDisplayed = false;
	// 	console.log('block!!');
	// }else{
	// 	el.style.display = 'none';
	// 	//isDisplayed = true;
	// 	console.log('none!!');
	// }
};

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
           	//menu_icon.style.display = "none";
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
    		//menu_icon.style.display = "inline-block";
    };

    	document.getElementById('aside-nav').onclick = function() {
    		$('#sidemenu').modal('toggle');
    	};
    	document.getElementById('sidemenu').onclick = function() {
    		$('#sidemenu').modal('hide');
    	};

});
