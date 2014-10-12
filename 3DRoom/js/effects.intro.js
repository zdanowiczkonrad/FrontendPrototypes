///////////////////////////////////////
//    KONRAD ZDANOWICZ 2009-2010     //
//    zdanowicz.konrad@gmail.com     //
//  kopiowanie bez zgody ZABRONIONE  //
//                                   //
//   kod do biblioteki jQuery 1.2.6  //
//                                   //
//     na potrzeby www.polger.eu     //
///////////////////////////////////////

jQuery(document).ready(function(){





///////////////////////////////////////////
/////  MAPA STRONY - efekt HOVER
///////////////////////////////////////////


	$('#intro_sitemap a').append('<span></span>');  // tworzy <SPAN> pod znacznikem <a>

	$('#intro_sitemap ul a').mouseover(function(){  // zdarzenie a:hover
	
		var szer_span=$(this).width();		// wyliczanie szerokosci <a>
		$('span',this).css({"marginLeft":0});
		$('span', this).stop().animate({"width": szer_span,"marginLeft":0}); // animacja podkreslenia
		$(this).stop().animate({"color":"#955"}, {"duration": 240}); // animacja koloru
				
	});

	$('#intro_sitemap ul a').mouseout(function(){ // zdarzenie a:out
		
		var szer_span=$(this).width(); //wyliczanie szerokosci <a>

		$(this).stop().animate({'color':'#616982'},{"duration":200}); //animacja koloru		
		$('span',this).stop().animate({width: 0,"marginLeft":szer_span}); // animacja podkreslenia

	});
		
		
///////////////////////////////////////////
/////  WEJSCIE NA STRONE button - HOVER
///////////////////////////////////////////
		
	$('#intro_enterbutton').mouseover(function(){
		$('#intro_enterbutton span').stop().animate({opacity: 0}); //przezroczystosc warstwy static->0
	});
				
	$('#intro_enterbutton').mouseout(function(){
		$('#intro_enterbutton span').stop().animate({opacity: 1}); //static->1
	});	

///////////////////////////////////////////
/////  PRELOADING OBRAZOW
///////////////////////////////////////////
	
	// FUNKCJA PRELOADUJACA
	//
	//
	// dwa argumenty: zrodlo obrazka i funkcja callback
	// co robi: tworzy obiekt img w strukturze DOM. kiedy obiekt ten
	// zostanie wczytany do drzewa, odpalana jest funkcja callback
	// return: funkcja zwraca
	//


        $.fn.image = function(src, f){
        return this.each(function(){
                var i = new Image();
                        i.src = src;
                        i.onload = f;
                        this.appendChild(i);
                });
        }
		
	
	 // LOADING BOX
	 //
       // wrzucamy loading box do containera
	 //

		$('#intro_room')
		.prepend('<div class="preloader">'
				+'<div class="box">'
					+'<strong>Proszę czekać, trwa ładowanie animacji...</strong>'
					+'<div class="progress">'
						+'<div class="progressbar"></div>'
						+'<strong>'
							+'<span>0</span>%'
							+'<code></code>'
						+'</strong>'
					+'</div>'
				+'</div>'
			+'</div>');
		
         // nadajemy zdarzenie linkowi ucieczki


///////////////////////////////////////////
/////  OBRAZY DO ZALADOWANIA

	var do_zaladowania = [
			'js/sprites/landscape.jpg',
			'js/sprites/kot.png', 
			'js/sprites/background.png',
			'js/sprites/lampytyl.png',
			'js/sprites/komputer.png',
			'js/sprites/krzeslo.png',
			'js/sprites/laminator.png',
			'js/sprites/smietnik.png',
			'js/sprites/ploter.png',
			'js/sprites/stol.png',
			'js/sprites/boss.png',
			'js/sprites/polka.png',
			'js/sprites/roslinka.png',
			'js/sprites/lampyprzod.png'
	 ];

		

		
	var obrazkow=do_zaladowania.length; // liczba obrazow do zaladowania
	var zaladowano=0;				// ile obrazow zaladowano
	var i=1;					// iterator
	var treshold=(100/obrazkow);		// skok procentow za kazdym obrazem zaladowanym
		
	var progress=0;				// obecny postep w procentach
 //
 //
 // FUNKCJA NA ZAKONCZENIE
 // 
 //////////////////////////////////


	function finish()
	{	
	
     		if($.browser.msie) if($.browser.version<7) //KOCHANE IE6
		{
		   $('#intro_room img').ifixpng(); 
		}

	   $('#intro_room .box strong span').replaceWith('<span>100</span>');
	   $('.progressbar').animate({width: Math.ceil(3*100)},100);
	    jQuery('#intro_room').jparallax( // inicujujemy 3droom

		{
			takeoverThresh: 0.00004, // czynnik wzniesienia
			takeoverFactor: 0.87,    // mnoznik ruchu
			yparallax: false         // blokujemy os Y ruchu
		},
		{xtravel: 0}, 			 // blokujemy ruch loadera
		{xtravel: -0.5}			 // ruch tla
	    );
	
	    $('.box').fadeOut('slow', function() { //gasimy loaderbox
			$('.preloader').fadeOut();
	    });

}

				
		
	  // FUNKCJA WLASCIWA DO PRELOADOWANIA - rekurencyjna

	var random_nr=escape(new Date().getTime()); // GENERUJEMY HASH


	  function preloadImage(src,target,parameter)
	  {
	

			$(target).image((src+'?'+ random_nr),function(){             // wywolujemy funkcje i definijemy jej onload
				
				progress+=treshold;		// POSTEP+=% JEDNEGO OBRAZKA
				$('.progressbar').stop().animate({width: Math.ceil(3*progress)},500, 'linear'); // animacja progressbara
				$('#intro_room .box strong span').replaceWith('<span>'+Math.floor(progress)+'</span>'); // % progress


				if(zaladowano<obrazkow) // jesli zostaly jeszcze obrazy do zaladowania
				{
					preloadImage(do_zaladowania[zaladowano],'.l_'+(++zaladowano),zaladowano); // wczytaj kolejny
				}

				if(Math.ceil(progress)>=100) finish();
						
				
			}); 
			
		}

	    // WYWOLANIE FUNKCJI
	    preloadImage(do_zaladowania[0],('.l_'+1),++zaladowano);


});			