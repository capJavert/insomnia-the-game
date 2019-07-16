$('#beta-signup-form').on('submit', function(e) {
		e.preventDefault();

		$.ajax({
			url: "beta-signup.php",
			method: "GET",
			data: { email : $('#email').val() },
			dataType: "html",
			success: function(data) {
				if(data=="1") {
					$('#beta-signup-form').parent().html("<h3>Sign up complete, thanks!</h3>");
				} else {
					$('#email').addClass('error');
				}
			},
			 error: function(jqXHR, textStatus, errorThrown) {
	        	console.log(textStatus, errorThrown);
	    	}
		});
});

// jQuery for displaying the navbar logo only after the main logo is scrolled out of the viewport
var $el = $('#logo');
var bottom = $el.position().top + $el.offset().top + $el.outerHeight(true);
$(window).scroll(function() {
    var currentscroll = $(document).scrollTop();
    if (currentscroll < bottom) {
        document.getElementById("logo-small").style.visibility = "hidden";
    } else {
        document.getElementById("logo-small").style.visibility = "visible";
    }
});
