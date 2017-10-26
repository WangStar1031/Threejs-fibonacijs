function init_listAni(state) {
  console.log("init list-ani");
  var $listItems = $('#list li');  
  var $line = $('#line');  
  if(state == "start") {
    animateIn();
    addListeners();

  } else if(state == "end") {
    animateOut();
  }
  
  
  
  function animateIn() {
    console.log("start animation");
    $listItems.each(function(i) {
      this.index = i;
      $(this).velocity({translateX: [i*150+'px', [ 250, 15 ]], opacity: [1, {ease: 'linear', duration: 400}], rotation: '30deg'}, {delay: 1000+(500-(i*100)), duration: 2000, easing: [ 250, 15 ], queue: false});
  	});
     $line.velocity({width: 612}, {duration: 5000, easing: [ 250, 15 ], delay: 1000});
  }

  function animateOut() {
    console.log("end animation");
    $listItems.each(function(i) {
      this.index = i;
      $(this).velocity({translateX: ['0px', [ 250, 15 ]], opacity: [1, {ease: 'linear', duration: 400}], rotation: '30deg'}, {delay: 1000+(500-(i*100)), duration: 2000, easing: [ 250, 15 ], queue: false});
    });
     $line.velocity({width: 0}, {duration: 1000, easing: [ 250, 15 ], delay: 1000});
  }
	
  function addListeners() {
    console.log("addListeners");
    $listItems.on('mouseenter', over).on('mouseleave', out);
    
  }
  
  function over() {
    var hoverIndex = this.index;
    $(this).velocity({scale: 1.4}, {duration: 300, easing: 'easeOutCubic', queue: false});

    $listItems.each(function(i) {
      if(hoverIndex != i) {
         $(this).velocity({translateX: (i*150)-(18/(hoverIndex-i))+'px'}, {duration: 900, easing: [ 250, 15 ], queue: false});
      }
    });
  }

  function out() {
    var hoverIndex = this.index;
    $(this).velocity({scale: 1},{duration: 300, easing: 'easeOutCubic', queue: false});

    $listItems.each(function(i) {
      if(hoverIndex != i) {
        $(this).velocity({translateX: (i*150)+'px'}, {queue: false, duration: 900, easing: [ 250, 15 ]});
      }
    });
  }
}

var width = 0;
  function onWindowResize(event) {
    // console.log("before: " + width);
    if((window.innerWidth > width) && (window.innerWidth > 768)) {
      console.log("ok");      
      init_listAni("start");
    }
    width = window.innerWidth;
    
    // console.log("after: " + width);
  }

window.addEventListener('resize', onWindowResize, false);
// init_listAni();
// console.log("ani");

// $(document).on('ready', init_listAni);