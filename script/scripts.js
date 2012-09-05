$(document).ready(function () {

    Responsive.Init();
    
    // iOS scale bug fix
    MBP.scaleFix();
    
});


Responsive = {
	'Init': function() {
	
	  var currentBreakpoint; // default's to blank so it's always analysed on first load
	  var didResize  = true; // default's to true so it's always analysed on first load
	  var raw_slider = $("#featured").html(); // grab the unaltered HTML and store it
	
	  // on window resize, set the didResize to true
	  $(window).resize(function() {
	    didResize = true;
	  });
	
	  // every 1/4 second, check if the browser was resized
	  // we throttled this because some browsers fire the resize even continuously during resize
	  // that causes excessive processing, this helps limit that
	  setInterval(function() {
	    if(didResize) {
	      didResize = false;
	
	      // inspect the CSS to see what breakpoint the new window width has fallen into
	      var newBreakpoint = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
	
	      /* tidy up after inconsistent browsers (some include quotation marks, they shouldn't) */
	      newBreakpoint = newBreakpoint.replace(/"/g, "");
	      newBreakpoint = newBreakpoint.replace(/'/g, "");
	
	      // if the new breakpoint is different to the old one, do some stuff
	      if (currentBreakpoint != newBreakpoint) {
	
	        // remove the old flexslider (which has attached event handlers and adjusted DOM nodes)
	        $("#featured").remove();
	
	        // now re-insert clean mark-up so flexslider can run on it properly
	        
	
	        // execute JS specific to each breakpoint
	        if (newBreakpoint === 'breakpoint_1') {
	          // the narrowset breakpoint is now the current breakpoint
	          currentBreakpoint = 'breakpoint_1';
	          
	          $("#articles").append("<div id='featured'></div>");
	          $("#featured").html(raw_slider);

	        }
	        if (newBreakpoint === 'breakpoint_2') {
	          // the second largest breakpoint is now the current one
	          currentBreakpoint = 'breakpoint_2';
	          	
	          $("#articles").prepend("<div id='featured'></div>");
	          $("#featured").html(raw_slider);

	        }
	      }
	    }
	  }, 250);
	}
};


