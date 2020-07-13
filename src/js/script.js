
$(document).ready(function () {
	$('.carousel__inner').slick({
		speed: 1200,
		adaptiveHeight: false,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	});
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});


	/*  $('.catalog-item__link').each(function(i) {
		   $(this).on('click', function(e) {
			   e.preventDefault();
			   $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			   $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		   })
	   });
   
   
   
	   $('.catalog-item__back').each(function(i) {
		   $(this).on('click', function(e) {
			   e.preventDefault();
			   $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			   $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		   })
	   }); */

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});

	};


	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//modal

	$('[data-modal=consultation').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});


	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');

		})

	});

	//валидация

	function valideForms(form){
		$(form).validate({
			rules:{
				 name: {
					required: true,
					minlength: 2
				  },
				 phone: "required",
				 email: {
					 required: true,
					 email: true
				 }
				},
			messages: {    
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Требуется не менее {2} символов")
				  },
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Ваша почта должна быть в формате name@domain.com"
					}
	
			 },
			 submitHandler: function() {
				$.ajax({
					type: "POST",
					url: "mailer/smart.php",
					data: $('#modal-form').serialize()
				}).done(function() {
					$('#modal-form').find("input").val("");   
					$('#modal').fadeOut('fast');
					$('#thanks').fadeIn('fast');
					$('form').trigger('reset');
				});
				return false;
			  }
		 });

	};
	valideForms('#consultation-form'),
	valideForms('#consultation form'),
	valideForms('#order form')
	
    $('input[name=phone]').mask("+7 (999) 999-99-99");
	


	
	//smooth scroll  and pageup

	$(window).scroll(function(){
		if($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href^=#up]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	new WOW().init();
	

});  
