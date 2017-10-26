(function(){
		'use strict';

var slide = $(".slide");
var viewHeight = $(window).height();
var sliderInner = $(".slider-inner");
var childrenNo = sliderInner.children().length;
sliderInner.height( viewHeight * childrenNo );
$(window).resize(function(){
viewHeight = $(window).height();
});
function setHeight(){
slide.each(function(){
$(this).height(viewHeight);
$(this).css("top", viewHeight * $(this).index());
});
}
function setActive(element){
	var clickedIndex = element.index();	
	$(".slider-nav").show();
//	$("#sketch-0").hide();
	switch(clickedIndex) {
		case 0:
			$(".slider-nav").hide();
			break;
		case 1:
//			$("#sketch-0").show();
			isDrawed = false;
			index = 0;
			idLineMax = 0;
			isSecondTab = true;
			$(".container2").css("visibility", "visible");
			// drawFibonacciLine();
			break;
		case 2:
			$(".container3").css("visibility", "visible");
			if(window.innerWidth > 768) {
				init_listAni("start");				
			}
			
			break;
		case 3:
			$(".container4").css("visibility", "visible");
			start_backAni();
			break;
		case 4:

			$(".container5").css("visibility", "visible");//			
			time = 0;			
			break;
		default:
			break;
	}
	var hei = $(".slider").height();

		
	$(".slider-nav .active").removeClass("active");
	element.addClass("active");
	sliderInner.css("transform", "translateY(-" + clickedIndex * viewHeight + "px) translateZ(0)");
	$(".slider-inner .active").removeClass("active");
	$(".slider-inner .slide").eq(clickedIndex).addClass("active");

	if(clickedIndex != 2) init_listAni("end");	//animateOut function in list-ani.js file
}
$(".slider-nav").hide();
setHeight();
	
$(".slider-nav > div").on("click", function(){
setActive($(this));
});
$(".menu-button > div").on("click", function(){
	var id = $(this).attr('id');
	console.log(id);
	var elem = ".cut_diamond_" + (id);
	setActive($(elem));
})

/**/
/*	$(".menu-items .icon_1").on("click", function(){
		$(".cut_diamond_1").click();
		$('.slider-nav').removeClass('hidden_slider_nav');
		});
		
	$(".menu-items .icon_2").on("click", function(){
		$(".cut_diamond_2").click();
		$('.slider-nav').removeClass('hidden_slider_nav');
		});
	
	$(".menu-items .icon_3").on("click", function(){
		$(".cut_diamond_3").click();
		$('.slider-nav').removeClass('hidden_slider_nav');
		});
		
	$(".menu-items .icon_4").on("click", function(){
		$(".cut_diamond_4").click();
		$('.slider-nav').removeClass('hidden_slider_nav');
		});*/
		
/**/	
$(window).resize(function(){
setHeight();
});
setTimeout(function(){
$(".slider").fadeIn(500);
}, 2000);
	

var dragging = false;
var veloc = 10;
var amplitude = 30;
var decay = .5;
var time = 0;
var pend = 0;

function update() {	
  if (!dragging) {
    pend = amplitude * Math.sin(veloc * time) / Math.exp(decay * time);
    $(".string").css({
      "transform": "rotate(" + pend + "deg)"
    });
    time = time + .01;
  }
  window.requestAnimationFrame(update);
}
update();
	
	
})(jQuery);

$(document).ready(function() {
    if( $('.cut_diamond_0').hasClass('active') ) {
      $('.slider-nav').addClass('hidden_slider_nav');
    } else {
	  $('.slider-nav').removeClass('hidden_slider_nav');
	}
});



