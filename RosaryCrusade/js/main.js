
$(document).ready(function() {
							   
		var currentPosition = 0;
		var slideWidth = 540;
		var slides = $('#flicker .slide');
		var numberOfSlides = slides.length;
		var slideShowInterval;
		var speed = 10000;

		
		slideShowInterval = setInterval(changePosition, speed);
		
		slides.wrapAll('<div id="slidesHolder"></div>')
		
		slides.css({ 'float' : 'left' });
		
		$('#slidesHolder').css('width', slideWidth * numberOfSlides);
		
		
		function changePosition() {
			if(currentPosition == numberOfSlides - 1) {
				currentPosition = 0;
			} else {
				currentPosition++;
			}
			moveSlide();
		}
		
		
		function moveSlide() {
			/*$('#slidesHolder .text p').animate({'height':1,'opacity':0},500,function(){
				$('#slidesHolder').animate({'marginLeft' : slideWidth*(-currentPosition)},800,function(){
					$('#slidesHolder .text p').animate({'height':235,'opacity':1},1000);
				});
			});*/

		$('#slidesHolder').animate({'marginLeft' : slideWidth*(-currentPosition)},600);		
		}
		
		slides.click(function() {
			changePosition();
		});
	});
