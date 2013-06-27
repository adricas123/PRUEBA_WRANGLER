if($.browser.mozilla||$.browser.opera ){document.removeEventListener("DOMContentLoaded",jQuery.ready,false);document.addEventListener("DOMContentLoaded",function(){jQuery.ready()},false)}
jQuery.event.remove( window, "load", jQuery.ready );
jQuery.event.add( window, "load", function(){jQuery.ready();} );
jQuery.extend({
	includeStates:{},
	include:function(url,callback,dependency){
		if ( typeof callback!='function'&&!dependency){
			dependency = callback;
			callback = null;
		}
		url = url.replace('\n', '');
		jQuery.includeStates[url] = false;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.onload = function () {
			jQuery.includeStates[url] = true;
			if ( callback )
				callback.call(script);
		};
		script.onreadystatechange = function () {
			if ( this.readyState != "complete" && this.readyState != "loaded" ) return;
			jQuery.includeStates[url] = true;
			if ( callback )
				callback.call(script);
		};
		script.src = url;
		if ( dependency ) {
			if ( dependency.constructor != Array )
				dependency = [dependency];
			setTimeout(function(){
				var valid = true;
				$.each(dependency, function(k, v){
					if (! v() ) {
						valid = false;
						return false;
					}
				})
				if ( valid )
					document.getElementsByTagName('body')[0].appendChild(script);
				else
					setTimeout(arguments.callee, 10);
			}, 10);
		}
		else
			document.getElementsByTagName('body')[0].appendChild(script);
		return function(){
			return jQuery.includeStates[url];
		}
	},

	readyOld: jQuery.ready,
	ready: function () {
		if (jQuery.isReady) return;
		imReady = true;
		$.each(jQuery.includeStates, function(url, state) {
			if (! state)
				return imReady = false;
		});
		if (imReady) {
			jQuery.readyOld.apply(jQuery, arguments);
		} else {
			setTimeout(arguments.callee, 10);
		}
	}
});

/* ---------------------------------------------------------------------- */
/*	Include Javascript Files
/* ---------------------------------------------------------------------- */

	$.include('js/jquery.cycle.all.min.js');
	$.include('js/respond.min.js');
	
	if(jQuery('#portfolio-items').length) {$.include('js/jquery.isotope.min.js');}
	
	if(jQuery('.single-image').length) {$.include('fancybox/jquery.fancybox.pack.js');}
	
	if(jQuery('#jstwitter').length) {$.include('js/jquery.twitter.js');}
	
	if(jQuery('#jplayer').length) {$.include('js/jquery.jplayer.min.js');}
	
/* end */

/* ---------------------------------------------------------------------- */
/*	Load google Fonts
/* ---------------------------------------------------------------------- */
	
WebFontConfig = {
		google: {families: ['Ubuntu+Condensed::latin','Ubuntu:400italic:latin','Dancing+Script:400:latin']}
	  };
	  (function() {
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
			'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('body')[0];
		s.appendChild(wf, s);
	  })();

/* end google Fonts */

/************************************************************************/
/* DOM READY --> Begin													*/
/************************************************************************/

jQuery(document).ready(function($){

	/* ---------------------------------------------------------------------- */
	/*	Top Toggle Panel
	/* ---------------------------------------------------------------------- */

	(function(){
		
		var $html = $('.panel-entry').animate({opacity: "0"},200);

		$('.toggle').click(function (e) {
				var $target = $(e.target);
				$html.animate({opacity: "0"},0);
			$('.panel').slideToggle('1000',"linear", function(){
					$html.animate({opacity: "1"},200);
					$('.toggle').toggleClass('hide');
				}   
			);
				return false;
			});

	})();
	
	/* end top toggle panel */
	
	/* ---------------------------------------------------------------------- */
	/*	For Touch device
	/* ---------------------------------------------------------------------- */

	(function() {

		if(Modernizr.touch)
			$('body').addClass('touch-device');

	})();

	/* end Detect touch device */	


	/* ---------------------------------------------------------------------- */
	/*	TransBanner
	/* ---------------------------------------------------------------------- */

	(function() {
		
		if($('.TB_Wrapper').length) {
			
			$('.TB_Wrapper').TransBanner({
				
				slide_autoplay: true,
				slide_delaytime: 5,
				slide_transition: 3,
				slide_transition_period: 800,
				slide_preload_images: 1,
				slide_random_order: false,

				image_align_center: true,
				image_resize: true,
				image_resize_to_fit: false,

				navigation_type: 2,
				
				button_size: 20,
				button_size_touch_device: 28,
				button_margin: 4,
				button_opacity: .7,
				button_space: 5,
				button_color: '#FFFFFF',

				button_show_next: false,
				button_show_back: false,
				button_show_timer: true,
				button_show_numbers: true,
				button_numbers_autohide: true,
				button_numbers_horizontal: false,

				caption_bg       			: '#000000',
				caption_margin_x			: 0,
				caption_margin_y			: 0,
				
				caption_padding_x : 19,
				caption_padding_y : 15,			
				caption_float_mode: true,
				caption_position_x : 500,
				caption_position_y : 0,
				caption_bg_color : '#000000',
				caption_bg_opacity: .86,
				caption_width : 200,
				caption_height : 250,	
				caption_bg_radius : 0,	
				
				responsive : true,
				responsive_limit_navigation_type : 2, 
				responsive_screen_based_limits : false 
			});			
		}

	})();

	/* end TransBanner */

	/* ---------------------------------------------------------------------- */
	/*	Flex Slider
	/* ---------------------------------------------------------------------- */

	(function() {
		
		if ($('#slider').length) {
			$(window).load(function() {
				$('#slider').flexslider({
					directionNav: false
				});
			});
		}
	
	})();

	/* end Flex Slider */
	
	/* ---------------------------------------------------------------------- */
	/*	google Maps
	/* ---------------------------------------------------------------------- */

	(function() {

		if($('#map').length) {
			$('#map').gMap({ 
				address: ' 123, Some street, Washington, USA',
				zoom: 14,
				markers: [
					{'address' : ' 123, Some street, Washington, USA'}
				]
			});  
		}

	})();

	/* end google Maps */

	/* ---------------------------------------------------------------------- */
	/*	Fit Videos
	/* ---------------------------------------------------------------------- */

	(function() {

		$('.container').each(function(){
			var target  = [
				"iframe[src^='http://www.youtube.com']",
				"iframe[src^='http://player.vimeo.com']"
			],
				$allVideos = $(this).find(target.join(','));

			$allVideos.each(function(){
				var $this = $(this);
				if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.liquid-video-wrapper').length) {return;} 
				var height = this.tagName.toLowerCase() == 'object' ? $this.attr('height') : $this.height(),
				aspectRatio = height / $this.width();
				if(!$this.attr('id')){
					var $ID =  Math.floor(Math.random()*9999999);
					$this.attr('id', $ID);
				}
				$this.wrap('<div class="liquid-video-wrapper"></div>').parent('.liquid-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
				$this.removeAttr('height').removeAttr('width');
			});
		});
		
	})();

	/* end Fit Videos */

	/* ---------------------------------------------------------------------- */
	/*	VideoJS
	/* ---------------------------------------------------------------------- */

	(function() {

		var $player = $('.video-js');

		if( $player.length ) {

			function adjustPlayer() {
			
				$player.each(function( i ) {

					var $this        = $(this)
						playerWidth  = $this.parent().width(),
						playerHeight = playerWidth / ( $this.children('.vjs-tech').data('aspect-ratio') || 1.78 );

					if( playerWidth <= 300 ) {
						$this.addClass('vjs-player-width-300');
					} else {
						$this.removeClass('vjs-player-width-300');
					}

					if( playerWidth <= 250 ) {
						$this.addClass('vjs-player-width-250');
					} else {
						$this.removeClass('vjs-player-width-250');
					}

					$this.css({
						'height' : playerHeight,
						'width'  : playerWidth
					})
					.attr('height', playerHeight )
					.attr('width', playerWidth );

				});

			}

			adjustPlayer();

			$(window).on('resize', function() {

				var timer = window.setTimeout( function() {
					window.clearTimeout( timer );
					adjustPlayer();
				}, 30 );

			});

		}

	})();

	/* end VideoJS */

	/* ---------------------------------------------------- */
	/*	Min. Height
	/* ---------------------------------------------------- */

	(function() {

		$('section.container')
			.css( 'min-height', $(window).outerHeight(true) 
				- $('#header').outerHeight(true)
				- $('.page-title').outerHeight(true)
				- $('.page-header').outerHeight(true)
				- $('#footer').outerHeight(true));

	})();

	/* end Min. Height */

	/* ---------------------------------------------------- */
	/*	jPlayer
	/* ---------------------------------------------------- */
	
		if($('#jplayer').length) {
			$("#jplayer").jPlayer({
				ready: function () {
					$(this).jPlayer("setMedia", {
						m4a:"http://www.jplayer.org/audio/m4a/TSP-01-Cro_magnon_man.m4a",
						oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
					});
				},
				swfPath: "js",
				supplied: "m4a, oga",
				wmode: "window"
			});
		}
	

	/* end jPlayer */

	/* ---------------------------------------------------- */
	/*	Content Toggle
	/* ---------------------------------------------------- */

	(function() {

		if($('.toggle-container').length) {	
			$(".toggle-container").hide(); //Hide (Collapse) the toggle containers on load
			//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
			$(".trigger").click(function(){
				$(this).toggleClass("active").next().slideToggle("slow");
				return false; //Prevent the browser jump to the link anchor
			});
		}

	})();

	/* end Content Toggle */

	/* ---------------------------------------------------------------------- */
	/*	Accordion Content
	/* ---------------------------------------------------------------------- */

	(function() {

		if($('.acc-container').length) {

			var $container = $('.acc-container'),
				$trigger   = $('.acc-trigger');

			$container.hide();
			$trigger.first().addClass('active').next().show();

			var fullWidth = $container.outerWidth(true);
			$trigger.css('width', fullWidth);
			$container.css('width', fullWidth + 2);

			$trigger.on('click', function(e) {
				if( $(this).next().is(':hidden') ) {
					$trigger.removeClass('active').next().slideUp(300);
					$(this).toggleClass('active').next().slideDown(300);
				}
				e.preventDefault();
			});

			// Resize
			$(window).on('resize', function() {
				fullWidth = $container.outerWidth(true)
				$trigger.css('width', $trigger.parent().width() );
				$container.css('width', $container.parent().width() + 2 );
			});
		}
		
	})();

	/* end Accordion Content */

	/* ---------------------------------------------------- */
	/*	Content Tabs
	/* ---------------------------------------------------- */

	(function() {

		if($('.content-tabs').length) {

			var $contentTabs  = $('.content-tabs');

			$.fn.tabs = function($obj) {
					$tabsNavLis = $obj.find('.tabs-nav').children('li'),
					$tabContent = $obj.find('.tab-content');

				$tabContent.hide();	
				$tabsNavLis.first().addClass('active').show();
				$tabContent.first().show();

				$obj.find('ul.tabs-nav li').on('click', function(e) {
					var $this = $(this);

					$obj.find('ul.tabs-nav li').removeClass('active');
					$this.addClass('active');
					$obj.find('.tab-content').hide(); //Hide all tab content
					$($this.find('a').attr('href')).fadeIn();

					e.preventDefault();
				});
			}

			$contentTabs.tabs($contentTabs);
		}

	})();

	/* end Content Tabs */
	
		/* ---------------------------------------------------------------------- */
		/*	Contact Form
		/* ---------------------------------------------------------------------- */
	
	
		(function() {
			
			if($('#contactform').length) {

				var $form = $('#contactform'),
				$loader = '<img src="images/preloader.gif" height="11" width="16" alt="Loading..." />';
				$form.append('<div class="hidden" id="contact_form_responce">');

				var $response = $('#contact_form_responce');
				$response.append('<p></p>');

				$form.submit(function(e){

					$response.find('p').html($loader);

					var data = {
						action: "contact_form_request",
						values: $("#contactform").serialize()
					};

					//send data to server
					$.post("php/contact-send.php", data, function(response) {

						response = $.parseJSON(response);

						$(".wrong-data").removeClass("wrong-data");
						$response.find('img').remove();

						if(response.is_errors){

							$response.find('p').removeClass().addClass("error");
							$.each(response.info,function(input_name, input_label) {

								$("[name="+input_name+"]").addClass("wrong-data");
								$response.find('p').append('Please enter correctly "'+input_label+'"!'+ '</br>');
							});

						} else {

							$response.find('p').removeClass().addClass('success');

							if(response.info == 'success'){

								$response.find('p').append('Your email has been sent!');
								$form.find('input:not(input[type="submit"], button), textarea, select').val('').attr( 'checked', false );
								$response.delay(1000).hide(400);
							}

							if(response.info == 'server_fail'){
								$response.find('p').append('Server failed. Send later!');
							}
						}

						// Scroll to bottom of the form to show respond message
						var bottomPosition = $form.offset().top + $form.outerHeight() - $(window).height();

						if( $(document).scrollTop() < bottomPosition)
							$('html, body').animate({
								scrollTop : bottomPosition
							});
						
						$response.show(450);
					});

					e.preventDefault();

				});				

			}

		})();

		/* end Contact Form */
		
	

	/* ---------------------------------------------------- */
	/*	Fancybox
	/* ---------------------------------------------------- */
	
	(function() {
		
		if($('.single-image').length || $('a.video').length)  {
			(function() {
				$('.single-image, a.video').fancybox({
					'titlePosition' : 'over',
					'transitionIn'  : 'fade',
					'transitionOut' : 'fade'
				}).each(function() {
					$(this).append('<span class="curtain">&nbsp;</span>');
				});		
			})();
			
			if($('a.video').length) {
				(function() {
					$('a.video').on('click',function() {
						$.fancybox({
							'type' : 'iframe',
							'href' : this.href.replace(new RegExp('watch\\?v=', 'i'), 'embed/') + '&autoplay=1',
							'overlayShow' : true,
							'centerOnScroll' : true,
							'speedIn' : 100,
							'speedOut' : 50,
							'width' : 640,
							'height' : 480
						});
						return false;
					});
				})()
			}
		}
		
	})();

	/* end fancybox --> End */

	/* ------------------------------------------------------------------- */
	/*	Portfolio														   */
	/* ------------------------------------------------------------------- */

	(function() {

		var $cont = $('#portfolio-items');
		var $container = $('.container');

		if($cont.length) {

			var $itemsFilter = $('#portfolio-filter'),
				mouseOver;

			// Copy categories to item classes
			$('article', $cont).each(function(i) {
				var $this = $(this);
				$this.addClass( $this.attr('data-categories') );
			});

			// Run Isotope when all images are fully loaded
			$(window).on('load', function() {

				$cont.isotope({
					itemSelector : 'article',
					layoutMode   : 'fitRows'
				});

			});

			// Filter projects
			$itemsFilter.on('click', 'a', function(e) {
				var $this         = $(this),
					currentOption = $this.attr('data-categories');

				$itemsFilter.find('a').removeClass('active');
				$this.addClass('active');

				if(currentOption) {
					if(currentOption !== '*') currentOption = currentOption.replace(currentOption, '.' + currentOption)

					$cont.isotope({filter : currentOption});
				}

				e.preventDefault();
			});

			$itemsFilter.find('a').first().addClass('active');
		}

	})();

	/* end Portfolio  */

	/* ---------------------------------------------------------------------- */
	/*	Image Gallery Slider
	/* ---------------------------------------------------------------------- */
	
	(function() {

		var $slider = $('.image-gallery-slider ul, .image-post-slider ul');

		if($slider.length) {

			// Run slider when all images are fully loaded
			$(window).load(function() {

				$slider.each(function() {
					var $this = $(this);

					$this.css('height', $this.find('li:first img').height())
						.after('<div class="image-gallery-slider-nav"> <a class="prev">Prev</a> <a class="next">Next</a> </div>')
						.cycle({
							before: function(curr, next, opts) {
								var $this = $(this);
								$this.parent().stop().animate({height: $this.height()}, opts.speed);
							},
							containerResize : false,
							easing          : 'easeInOutExpo',
							fx              : 'scrollRight',
							fit             : true,
							next            : '.next' ,
							pause           : true,
							prev            : '.prev',
							slideExpr       : 'li',
							slideResize     : true,
							speed           : 600,
							timeout         : 4000,
							width           : '100%'
						});
				});

				// Pause on nav hover
				$('.image-gallery-slider-nav a').on('mouseenter', function() {
					$(this).parent().prev().cycle('pause');
				}).on('mouseleave', function() {
					$(this).parent().prev().cycle('resume');
				})

			});

			// Resize
			$(window).on('resize', function() {
				$slider.css('height', $slider.find('li:visible img').height() );
			});

			// Include swipe touch
			if(Modernizr.touch) {

				function swipe(e, dir) {

					var $slider = $(e.currentTarget);

					$slider.data('dir', '')

					if(dir === 'left') {
						$slider.cycle('next');
					}

					if(dir === 'right') {
						$slider.data('dir', 'prev')
						$slider.cycle('prev');
					}

				}

				$slider.swipe({
					swipeLeft       : swipe,
					swipeRight      : swipe,
					allowPageScroll : 'auto'
				});

			}
		}
		
	})();
	
	/* ---------------------------------------------------------------------- */
	/*	Gallery
	/* ---------------------------------------------------------------------- */
	
	(function() {
	
		if($('#thumbscreen').length) {

			var trigger = 0, $content = $('#project-content');
						
			$("#thumbscreen").slides({
				container: 'container-slides',
				generateNextPrev: true,
				pagination: false
			});

			$(".project-thumbnails li a").on('click',function(e){
				
				if (trigger == 0) {

					var $projectPos = $('#projects > .content').offset().top + 50;

					$('html, body').animate({
						scrollTop : $projectPos
					});

					$("#project-container, .thumbscreen-slides:visible .project-div").slideDown("slow");
						
					$("#projects .content").animate({
						"top": "-=235px"
					}, "slow");
						
					$(".next, .prev").hide();
						
					$(".project-thumbnails li a").css({
						"opacity": "0.2"
					}).click(function(){
						return false;
					});
						
					trigger = 1;
					$id = $(this).attr("href");

					if($id.length) {

						getContent($id);

						jQuery('.pics', $id).cycle({ 	
							fx:     'scrollHorz', 
							timeout: 0, 
							speed: 300,
							next:   '.bx-next',
							prev:   '.bx-prev'
						});

					} else {
						return false;
					}

					$(this).blur();
						
					return false;
				} else {
					$("#project-container, .thumbscreen-slides:visible .project-div").slideUp("slow");
					$("#projects .content").animate({
						"top": "+=235px"
					}, "slow");
					$(".next, .prev").delay(600).fadeIn("slow");
					$(".project-thumbnails a").css({
						"opacity": "1"
					});
					trigger = 0;
					$content.find('> div').fadeOut(250);
					return false;
				}
				e.preventDefault();
			});

			$("a.project-slider-next").live("click", function() {
				var $qw = $(this).closest('.grid-wrapper');
				var $next = $qw.next();
				if($next.length) {
					$qw.fadeOut(350, function() {
						$next.fadeIn(350);
					});
				}
				return false;
			});

			$("a.project-slider-prev").live("click", function() {
				var $qw = $(this).closest('.grid-wrapper');
				var $prev = $qw.prev();
				if($prev.length) {
					$qw.fadeOut(350, function() {
						$prev.fadeIn(350);
					});
				}
				return false;
			});

			$(".project-slider-close").click(function(){
				$("#project-container, .thumbscreen-slides:visible .project-div").slideUp("slow");
				$("#projects .content").animate({"top": "+=235px"}, "slow");
				$(".next, .prev").delay(600).fadeIn("slow");
				$(".project-thumbnails a").css({"opacity": "1"});
				trigger = 0;
				$content.find('> div').fadeOut(250);
				return false;
			});

			function getContent($id) {
				var $result = $content.find($id);
					$result.fadeIn(200);
			}
		}
	
	})();
	
	/* end Gallery  */


/************************************************************************/
});/* DOM READY --> End													*/
/************************************************************************/
