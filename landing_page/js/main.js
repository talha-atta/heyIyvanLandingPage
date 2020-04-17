
$(document).ready(function() {
	"use strict";		
		
		$(".checklistform").hide();
		$(".resultform").hide();
		$("#findme").on("click", function(f){
	        $(".waitlistform, .checklistform").toggle();
    	});
    	$("#signme").on("click", function(d){
	        $(".checklistform, .waitlistform").toggle();
    	});
    	$.fn.digits = function(){ 
		    return this.each(function(){ 
		        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
		    })
		};	
	    $("#waitlistbutton").click(function(e){
	    	e.preventDefault();
	    	var getUrlParameter = function getUrlParameter(sParam) {
			    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			        sURLVariables = sPageURL.split('&'),
			        sParameterName,
			        i;

			    for (i = 0; i < sURLVariables.length; i++) {
			        sParameterName = sURLVariables[i].split('=');

			        if (sParameterName[0] === sParam) {
			            return sParameterName[1] === undefined ? true : sParameterName[1];
			        }
			    }
				};
			var refcode = getUrlParameter('refcode');			
	    	var p = $("#waitlistemail").val();
	    	var url = "https://ava.app.waitlisted.co/api/v1/reservation?email="+p+"&refcode="+refcode;
	    	$.ajax({
				  type: "POST",
				  url: url,				  
				  data: p,				  
				  success: function(data) {
				       $(".waitlistform").remove();	    		
			    		$(".resultform").show();			    		
			    		$("#result1").append("<h1>"+data.reservation.position+"</h1>");
			    		$("#result1").digits("<h1>"+data.reservation.position+"</h1>");
			    		$("#totalcount").append(data.meta.total);
			    		$("#totalcount").digits(data.meta.total);
			    		
			    		var aff = data.reservation.affiliate;
			    		var sharelink = "http://heyava.com?refcode="+aff;
			    		
			    		// Twitter Share 

			    		var twitterurl = "https://twitter.com/intent/tweet?";			    		
			    		$("a#twittershare").attr("href", twitterurl + "url=" + sharelink + "&text=Ava finds you the best experts with just one text. Join the waitlist." );
			    		
			    		// // Facebook Share - remember to include ampersands!

			    		var facebookurl = "https://www.facebook.com/dialog/feed?app_id=1748743698686949";			    		
			    		$("a#facebookshare").attr("href", facebookurl + "&link=" + sharelink + "&redirect_uri=http://www.heyava.com" );
			    		
			    		// // Reddit Share - remember to include ampersands!

			    		var redditurl = "http://reddit.com/submit?"			    		
			    		$("a#redditshare").attr("href", redditurl + "&refcode=" + aff + "&title=New app connects you with experts with just a text" + "&url=" + sharelink );

			    		// // email Share - dude, insane.

			    		var mailurl = "mailto:INSERTFRIENDSEMAIL@changeme.com?subject=Quick%20Fav...%20Help%20me%20out%20with%20this%20Ava%20Waitlist&body=Hey!%0A%0AI%20just%20signed%20up%20for%20an%20app%20that%20connects%20you%20to%20doctors%2C%20lawyers%2C%20and%20any%20other%20expert%20you%20need.%20Sign%20up%20at%20this%20link%20for%20early%20access%20for%20yourself%3A%20";	

			    		$("a#mailshare").attr("href", mailurl + sharelink );

			    		// // Link general share - phew.

			    		$("a#refurlshare").attr("href", sharelink );
			    		$("#refurlshare").append(sharelink);
				  },
				  error: function(XHR, status, err) {
				  	//alert(XHR.responseText)
				  	var whoops = $.parseJSON(XHR.responseText);
				  	console.log(whoops.errors.email);
				  	$("#errormessage").empty();
			     	$("#errormessage").append(whoops.errors.email[0]);
				  }
				});			  		  		
	    	    	
	    });

	    $("#checklistbutton").click(function(e){
	    	e.preventDefault();
	    	var p = $("#checklistemail").val();
	    	var url = "https://ava.app.waitlisted.co/api/v1/reservation?email=" + p;
	    	console.log(url)	    	   		  		
			// FORM TEST
	    	$.ajax({
				  type: "GET",
				  url: url,	  
				  success: function(data) {
				       $(".checklistform").remove();	    		
			    		$(".resultform").show();			    		
			    		$("#result1").append("<h1>"+data.reservation.position+"</h1>");
			    		$("#result1").digits("<h1>"+data.reservation.position+"</h1>");			    		
			    		$("#totalcount").append(data.meta.total);
			    		$("#totalcount").digits(data.meta.total);    		
			    		var aff = data.reservation.affiliate;
			    		var sharelink = "http://www.heyava.com?refcode="+aff;
			    		
			    		// Twitter Share 

			    		var twitterurl = "https://twitter.com/intent/tweet?";			    		
			    		$("a#twittershare").attr("href", twitterurl + "url=" + sharelink + "&text=Ava finds you the best experts with just one text. Join the waitlist." );
			    		
			    		// // Facebook Share - remember to include ampersands!

			    		var facebookurl = "https://www.facebook.com/dialog/feed?app_id=1748743698686949";			    		
			    		$("a#facebookshare").attr("href", facebookurl + "&link=" + sharelink + "&redirect_uri=http://www.heyava.com" );
			    		
			    		// // Reddit Share - remember to include ampersands!

			    		var redditurl = "http://reddit.com/submit?"			    		
			    		$("a#redditshare").attr("href", redditurl + "&refcode=" + aff + "&title=New app connects you with experts with just a text" + "&url=" + sharelink );

			    		// // email Share - dude, insane.

			    		var mailurl = "mailto:INSERTFRIENDSEMAIL@changeme.com?subject=Quick%20Fav...%20Help%20me%20out%20with%20this%20Ava%20Waitlist&body=Hey!%0A%0AI%20just%20signed%20up%20for%20an%20app%20that%20connects%20you%20to%20doctors%2C%20lawyers%2C%20and%20any%20other%20expert%20you%20need.%20Sign%20up%20at%20this%20link%20for%20early%20access%20for%20yourself%3A%20";	

			    		$("a#mailshare").attr("href", mailurl + sharelink );

			    		// // Link general share - phew.

			    		$("a#refurlshare").attr("href", sharelink );
			    		$("#refurlshare").append(sharelink);
				  },
				  error: function(XHR, status, err) {
				  	//alert(XHR.responseText)
				  	var whoops = $.parseJSON(XHR.responseText);
				  	console.log(whoops.error);
				  	$("#errormessagelander1").empty();
			     	$("#errormessagelander1").append(whoops.error);
				  }
				});
	    	    	
	    });




	    // FORM MAIN CTA #################################### 

	   	$("#waitlistbutton1").click(function(e){
	    	e.preventDefault();
	    	var p = $('#waitlist1').serializeArray();
	    	var url = "/text/invite";
	    	console.log(url);
	    	$('#successMessage').removeClass('hidden');
	    	$('#errorMessage').addClass('hidden');
	    	$.ajax({
				  type: "POST",
				  url: url,				  
				  data: p,				  
				  success: function(data) {
				  	console.log('woot');
				  },
				  error: function(XHR, status, err) {
				  	$('#successMessage').addClass('hidden');
				  	$("#errorMessage").removeClass('hidden');
				  }
				});
	    	    	
	    });

	    // $("#checklistbutton1").click(function(e){
	    // 	e.preventDefault();
	    // 	var p = $("#checklistemail1").val();
	    // 	var url = "https://ava.app.waitlisted.co/api/v1/reservation?email="	    	   		  		

	    // 	$.get(url+p, function(data) {
	    // 		$(".checklistform1").remove();	    		
	    // 		$(".resultform1").show();
	    // 		$("#result2").append("<h1>"+data.reservation.position+"</h1>");
	    // 		console.log(data.reservation.position);
	    // 	});
	    	    	
	    // }); 

	    $("#checklistbutton1").click(function(e){
	    	e.preventDefault();
	    	var p = $("#checklistemail1").val();
	    	var url = "https://ava.app.waitlisted.co/api/v1/reservation?email="+p;
	    	console.log(url)	    	   		  		
			// FORM TEST
	    	$.ajax({
				  type: "GET",
				  url: url,				  
				  data: p,				  
				  success: function(data) {
				       $(".checklistform1").remove();	    		
			    		$(".resultform1").show();			    		
			    		$("#result2").append(data.reservation.position);
			    		$("#result2").digits("<h1>"+data.reservation.position+"</h1>");
			    		console.log(data.reservation.position);
			    		$("#totalcount2").append(data.meta.total);
			    		$("#totalcount2").digits(data.meta.total);
			    		console.log(data.meta.total);
			    		
			    		var aff = data.reservation.affiliate;
			    		var sharelink = "http://heyava.com?refcode="+aff;
			    		
			    		// Twitter Share 

			    		var twitterurl = "https://twitter.com/intent/tweet?";			    		
			    		$("a#twittershare1").attr("href", twitterurl + "url=" + sharelink + "&text=Ava finds you the best experts with just one text. Join the waitlist." );
			    		
			    		// // Facebook Share - remember to include ampersands!

			    		var facebookurl = "https://www.facebook.com/dialog/feed?app_id=1748743698686949";			    		
			    		$("a#facebookshare1").attr("href", facebookurl + "&link=" + sharelink + "&redirect_uri=http://www.heyava.com" );
			    		
			    		// // Reddit Share - remember to include ampersands!

			    		var redditurl = "http://reddit.com/submit?"			    		
			    		$("a#redditshare1").attr("href", redditurl + "&refcode=" + aff + "&title=New app connects you with experts with just a text" + "&url=" + sharelink );

			    		// // email Share - dude, insane.

			    		var mailurl = "mailto:INSERTFRIENDSEMAIL@changeme.com?subject=Quick%20Fav...%20Help%20me%20out%20with%20this%20Ava%20Waitlist&body=Hey!%0A%0AI%20just%20signed%20up%20for%20an%20app%20that%20connects%20you%20to%20doctors%2C%20lawyers%2C%20and%20any%20other%20expert%20you%20need.%20Sign%20up%20at%20this%20link%20for%20early%20access%20for%20yourself%3A%20";	

			    		$("a#mailshare1").attr("href", mailurl + sharelink );

			    		// // Link general share - phew.

			    		$("a#refurlshare1").attr("href", sharelink );
			    		$("#refurlshare1").append(sharelink);

				  },
				  error: function(XHR, status, err) {
				  	//alert(XHR.responseText)
				  	var whoops = $.parseJSON(XHR.responseText);
				  	console.log(whoops.error);
				  	$("#errormessage1").empty();
			     	$("#errormessage1").append(whoops.error);
				  }
				});
	    	    	
	    });	
    
});

 

