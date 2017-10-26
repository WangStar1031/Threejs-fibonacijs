/*animujące się logo GT*/

var $logo = $(".logo-gt");
setTimeout(overHandler, 5000);	 //mycode
$('.logo-gt').on('mouseenter', function(){
	overHandler();
	return false;
});

function overHandler(e) {
	// console.log("time");
	var rotation = 0;
	var rotation2 = 720;
	var tl = new TimelineMax();	
	
	if(TweenMax.isTweening($logo)) {
		return; 
	} else {
		tl.set($logo, {scale: 1, rotation: 0});
		tl.to($logo, 0.8, {scale: 0.5, rotation: rotation + 720, ease: SlowMo.ease.config(0.7, 0.4) });
		tl.to($logo, 1.2, {scale: 1, rotation: "+=360", ease: Elastic.easeOut.config(0.5, 0.3) });
	};
		
};

$menuOpen = false;

$('.menu-button').click( function() {
  if( $menuOpen ) {
    $(".bar").removeClass("bar-clicked");
    
    if( $('.menu-button').hasClass('shrink-menu') ) {
      $('.menu-button').removeClass('shrink-menu');
      $('#1').removeClass('left');
      $('#2').removeClass('diag');
      $('#3').removeClass('down');
      $('#4').removeClass('last');
    }
    $('.menu-button').addClass('grow-menu');
    $('#1').addClass('revLeft');
    $('#2').addClass('revDiag');
    $('#3').addClass('revDown');
    $('#4').addClass('revLast');
    $menuOpen = false;
  }
  else {
    $(".bar").addClass("bar-clicked");

    if( $('.menu-button').hasClass('grow-menu') ) {
      $('.menu-button').removeClass('grow-menu');
      $('#1').removeClass('revLeft');
      $('#2').removeClass('revDiag');
      $('#3').removeClass('revDown');
      $('#4').removeClass('revLast');
    }
    $('.menu-button').addClass('shrink-menu');
    $('#1').addClass('left');
    $('#2').addClass('diag');
    $('#3').addClass('down');
    $('#4').addClass('last');
    $menuOpen = true;
  }
});