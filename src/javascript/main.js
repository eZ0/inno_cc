$( document ).ready(function() {
	console.log('Ready!');

slide();

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

    // modal 
    //$('#sidemenu').modal('hide');
    //$('#sidemenu').modal('toggle');

    	document.getElementById('aside-nav').onclick = function() {
    		$('#sidemenu').modal('toggle');
    	};
    	document.getElementById('sidemenu').onclick = function() {
    		$('#sidemenu').modal('hide');
    	};

});
