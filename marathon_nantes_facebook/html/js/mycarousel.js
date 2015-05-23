	function startMoving(img) {
    var img$ = $(img);
    var imgWidth = img$.width();
    var screenWidth = $(window).width();
    var amount = screenWidth - (parseInt(img$.css("left"), 10) || 0);
    // if already past right edge, reset to 
    // just left of left edge
    if (amount <=0 ) {
        img$.css("left", -imgWidth);
        amount = screenWidth + imgWidth;
    }
    var moveRate = 100;   // pixels per second to move
    var time = amount * 1000 / moveRate;
    img$.stop(true)
        .animate({left: "+=" + amount}, time, "linear", function() {
            // when animation finishes, start over
            startMoving(this);
        })
}


    
        var loghandle = function(event, delta) {
        var currentIndex = $('div.active').index() + 1;
        if(delta > 0) {
            if(currentIndex!=1)
            {
           $('#myCarousel').carousel('prev');
            }
        }
        else{
           $('#myCarousel').carousel('next');
        }
                };


    $('#myCarousel').mousewheel(function(event, delta) {
                        loghandle(event, delta);
                    });
                    
    $('#carousel').each(function(){
        $(this).carousel({
            interval: false
        });
    });
    $.fn.carousel.defaults = {
    interval: false
  , pause: 'hover'
  }
  $('#page2_texte').hover(makeBigger, returnToOriginalSize);

function makeBigger() {
    $(this).css({height: '+=80%', width: '+=80%'});
}
function returnToOriginalSize() {
    $(this).css({height: "50%", width: ""});
}
  
  
  	function page3_develop() {
  	   document.getElementById("page3_texte1").hidden = true;
  	   document.getElementById("page3+").hidden = true;
  	   document.getElementById("page3_texte2").hidden = false;
  	   document.getElementById("page3_graph2").hidden = false;
  	   document.getElementById("page3x").hidden = false;
  	}
  	  	function page3_original() {
  	   document.getElementById("page3_texte1").hidden = false;

  	   document.getElementById("page3+").hidden = false;
  	   document.getElementById("page3_texte2").hidden = true;
  	   document.getElementById("page3_graph2").hidden = true;
  	   document.getElementById("page3x").hidden = true;
  	}
  	
  	function page4_develop() {
  	   document.getElementById("page4_texte1").hidden = true;
  	   document.getElementById("page4+").hidden = true;
  	   document.getElementById("page4x").hidden = false;
  	   document.getElementById("page4_texte2").hidden = false;
  	}
  	  	function page4_original() {
  	   document.getElementById("page4_texte1").hidden = false;
  	   document.getElementById("page4+").hidden = false;
  	   document.getElementById("page4x").hidden = true;
  	   document.getElementById("page4_texte2").hidden = true;
  	}
  	
  	function page5_data1_change() {
  	   document.getElementById("page5_data1").src = "img/data1G.svg";
  	   document.getElementById("page5_data2").src = "img/data2.svg";
  	   document.getElementById("page5_data3").src = "img/data3.svg";
  	   
  	   document.getElementById("page5_graphe").hidden = false;
  	   document.getElementById("page5_graphique21").hidden = true;
  	   document.getElementById("page5_graphique22").hidden = true;
  	   document.getElementById("page5_graphique23").hidden = true;
  	   document.getElementById("page5_graphique31").hidden = true;
  	   document.getElementById("page5_graphique32").hidden = true;
  	   document.getElementById("page5_graphique33").hidden = true;
  	   
  	   document.getElementById("page5_texte1").hidden = false;
  	   document.getElementById("page5_texte2").hidden = true;
  	   document.getElementById("page5_texte3").hidden = true;
  	}
  	
  	  	function page5_data2_change() {
  	   document.getElementById("page5_data1").src = "img/data1.svg";
  	   document.getElementById("page5_data2").src = "img/data2G.svg";
  	   document.getElementById("page5_data3").src = "img/data3.svg";
  	   
  	   document.getElementById("page5_graphique21").hidden = false;
  	   document.getElementById("page5_graphique22").hidden = false;
  	   document.getElementById("page5_graphique23").hidden = false;
  	   document.getElementById("page5_graphique31").hidden = true;
  	   document.getElementById("page5_graphique32").hidden = true;
  	   document.getElementById("page5_graphique33").hidden = true;
  	   document.getElementById("page5_graphe").hidden = true;
  	   
  	   document.getElementById("page5_texte1").hidden = true;
  	   document.getElementById("page5_texte2").hidden = false;
  	   document.getElementById("page5_texte3").hidden = true;
  	}
  	
  	  	function page5_data3_change() {
  	   document.getElementById("page5_data1").src = "img/data1.svg";
  	   document.getElementById("page5_data2").src = "img/data2.svg";
  	   document.getElementById("page5_data3").src = "img/data3G.svg";
  	   
  	   document.getElementById("page5_graphe").hidden = true;
  	   document.getElementById("page5_graphique21").hidden = true;
  	   document.getElementById("page5_graphique22").hidden = true;
  	   document.getElementById("page5_graphique23").hidden = true;
  	   document.getElementById("page5_graphique31").hidden = false;
  	   document.getElementById("page5_graphique32").hidden = false;
  	   document.getElementById("page5_graphique33").hidden = false;
  	   
  	   document.getElementById("page5_texte1").hidden = true;
  	   document.getElementById("page5_texte2").hidden = true;
  	   document.getElementById("page5_texte3").hidden = false;
  	}
 

