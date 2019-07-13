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