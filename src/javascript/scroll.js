// scrollspy for courses page

var item1 = document.getElementById('item1');
var item2 = document.getElementById('item2');
var item3 = document.getElementById('item3');

item2.style.display = 'none';
item3.style.display = 'none';

// Cache selectors
var lastId;
var topMenu = $("#side-menu");
//var topMenuHeight = topMenu.outerHeight()+15;
var topMenuHeight = 200;
// All list items
var menuItems = topMenu.find("a");
// Anchors corresponding to menu items
var scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
// find corresponding text item and fade it in
	var href = $(this).attr("href");
	var el = $('div[class^="wrap"]').not('href');
	// toggle menu items active/unactive
	$('li').click(function() {
		$("li.active").removeClass("active");
		$(this).closest('li').addClass('active');
	});
		$('div.wrap.displayed').removeClass('displayed').fadeOut(800).slideUp(300);
		$(href).addClass('displayed').fadeIn(1000);
	e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position

   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
      return this;
   });

   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   var href = $(this).attr("href");
   id = $(this).attr("href");

  // console.log("id " + id);

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
});