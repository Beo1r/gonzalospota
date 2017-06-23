$(document).ready(function() {
	$(document).on("click",".navbar-collapse.in",function(e) {
		if( $(e.target).is("a") && $(e.target).attr("class") != "dropdown-toggle" ) {
			$(this).collapse("hide");
		}
	});
	$('.panel-collapse').on('show.bs.collapse', function() {
		$(this).prev().find('.glyphicon').css({'transition': '.35s linear', '-moz-transform': 'rotate(90deg)'});
		//$(this).prev().find('.glyphicon').toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
	});
	$('.panel-collapse').on('hidden.bs.collapse', function() {
		$(this).prev().find('.glyphicon').css({'transition': '.35s linear', '-moz-transform': 'rotate(0deg)'});
		//$(this).prev().find('.glyphicon').toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
	});
	function checkWidth() {
		if ($(window).width() < 768) {
			$('#result').removeClass('text-right');
			$("#result").css({ 'margin-bottom': '15px'});
		}
		else {
			$('#result').addClass('text-right');
			$("#result").css({ 'margin-bottom': ''});
		}
	}
	$(window).resize(checkWidth);
	var button;
	$('.ladda-button').click(function(e){
        button = this;
    });
	var url = document.location.toString();
	if ( url.match('#') && (url.split('#')[1] != 'about') ) {
		$('.navbar-nav a[href=#'+url.split('#')[1]+']').tab('show') ;
		$('#about').removeClass('active');
	}
	$('.navbar-nav a').on('shown.bs.tab', function (e) {
		window.location.hash = e.target.hash;
		window.scrollTo(0, 0);
	})
  	window.addEventListener('hashchange', function() {
		var changedHash=window.location.hash;
		if ( changedHash )
			changedHash && $('ul.nav a[href="' + changedHash + '"]').tab('show');
		else
			location.reload();
 	}, false);
	jQuery.validator.setDefaults({
		highlight: function(element) {
			jQuery(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
			jQuery(element).closest('.form-group').removeClass('has-error');
		},
		errorElement: 'span',
		errorClass: 'label label-danger'
	});
	$("#contact-form").validate({
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength: 70
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
				minlength: 5,
				maxlength: 1500
			}
		},
		messages: {
			name: {
				required: "Ingrese su nombre.",
				minlength: "Por favor, ingrese un nombre más largo.",
				maxlength: "Por favor, ingrese un nombre más corto."
			},
			email: "Ingrese su email.",
			message: {
				required: "Ingrese un mensaje.",
				minlength: "Por favor, ingrese un mensaje más largo.",
				maxlength: "Su mensaje supera el límite de caracteres."
			}
		},
		submitHandler: function(form, e) {
			var l = Ladda.create(button);
			$.ajax({
				type: "POST",
				url: "contact.php",
				data: $(form).serialize(),
				beforeSend: function(){
					$("#result").empty();
					l.start();
				},
				success: function(data){
					$("#result").html(data);
					l.stop();
				},
				error: function(){
					$("#result").html(data);
					l.stop();
				}
			});
		}
	});
 });