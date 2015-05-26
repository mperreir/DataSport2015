
/* Gestion des sliders */
var listSlider = ["#slider-vertical","#slider-vertical1","#slider-vertical2","#slider-vertical3","#slider-vertical4",
				  "#slider-vertical5","#slider-vertical6","#slider-vertical7","#slider-vertical8","#slider-vertical9"];
var nbSlider=10;
var lastSliderChanged="";
var lastSliderChangedIndice;
var indiceSuiv = function(thisE){
	var i;
	for(i=0;i<nbSlider;i++){
		if(listSlider[i]==thisE)
		{
			if(i+1==nbSlider)return 0;
			return i+1;
		}
	}
	return 0;
};
    var s=function (val) {
		$( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount" ).val().substring(0,$( "#amount" ).val().length-1);
		$( "#amount" ).val( ui.value+"%" );
		
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical",ancienneV,ui.value);
		mafonction(pageActuelle);
		}
		});
    $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" )+"%");
  };


	
   var s1 = function (val) { 
		$( "#slider-vertical1" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount1" ).val().substring(0,$( "#amount1" ).val().length-1);
        $( "#amount1" ).val( ui.value+"%" );
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical1",ancienneV,ui.value);
		mafonction(pageActuelle);
      }
    });
    $( "#amount1" ).val( $( "#slider-vertical1" ).slider( "value" )+"%" );
	
  };

	
  
  var s2= function (val) {
	$( "#slider-vertical2" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount2" ).val().substring(0,$( "#amount2" ).val().length-1);
        $( "#amount2" ).val( ui.value+"%");
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical2",ancienneV,ui.value);
		mafonction(pageActuelle);
      }
    });
    $( "#amount2" ).val( $( "#slider-vertical2" ).slider( "value" )+"%" );
  };

  var s3= function (val) {
	$( "#slider-vertical3" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount3" ).val().substring(0,$( "#amount3" ).val().length-1);
        $( "#amount3" ).val( ui.value+"%");
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical3",ancienneV,ui.value);
		mafonction(pageActuelle);
      }
    });
    $( "#amount3" ).val( $( "#slider-vertical3" ).slider( "value" )+"%" );
  }; 

  var s4= function (val) {
	$( "#slider-vertical4" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount4" ).val().substring(0,$( "#amount4" ).val().length-1);
        $( "#amount4" ).val( ui.value+"%");
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical4",ancienneV,ui.value);
		mafonction(pageActuelle);
      }
    });
    $( "#amount4" ).val( $( "#slider-vertical4" ).slider( "value" )+"%" );
  };
  var s5= function (val) {
	$( "#slider-vertical5" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount5" ).val().substring(0,$( "#amount5" ).val().length-1);
        $( "#amount5" ).val( ui.value+"%");
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical5",ancienneV,ui.value);
		mafonction(pageActuelle);
      }
    });
    $( "#amount5" ).val( $( "#slider-vertical5" ).slider( "value" )+"%" );
  };
  var s6= function (val) {
	$( "#slider-vertical6" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount6" ).val().substring(0,$( "#amount6" ).val().length-1);
        $( "#amount6" ).val( ui.value+"%");
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical6",ancienneV,ui.value);
		mafonction(pageActuelle);
      }
    });
    $( "#amount6" ).val( $( "#slider-vertical6" ).slider( "value" )+"%" );
  };

  var s7= function (val) {
	$( "#slider-vertical7" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount7" ).val().substring(0,$( "#amount7" ).val().length-1);
        $( "#amount7" ).val( ui.value+"%");
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical7",ancienneV,ui.value);
		mafonction(pageActuelle);
      }
    });
    $( "#amount7" ).val( $( "#slider-vertical7" ).slider( "value" )+"%" );
  };
  var s8= function (val) {
	$( "#slider-vertical8" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount8" ).val().substring(0,$( "#amount8" ).val().length-1);
        $( "#amount8" ).val( ui.value+"%");
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical8",ancienneV,ui.value);
		mafonction(pageActuelle);
      }
    });
    $( "#amount8" ).val( $( "#slider-vertical8" ).slider( "value" )+"%" );
  };

  var s9= function (val) {
	$( "#slider-vertical9" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
	  value:val,
      slide: function( event, ui ) {
		var ancienneV=$( "#amount9" ).val().substring(0,$( "#amount9" ).val().length-1);
        $( "#amount9" ).val( ui.value+"%");
		if(ancienneV!=ui.value)
		reglerAutreSlider("#slider-vertical9",ancienneV,ui.value);
		mafonction(pageActuelle);
      }
    });
    $( "#amount9" ).val( $( "#slider-vertical9" ).slider( "value" )+"%" );
  };  
  function getIndex(thisSlider){
	var i;
	for(i=0;i<nbSlider;i++){
		if(listSlider[i]==thisSlider)
			return i;
	}
	return -1;
  }

  function getNextIndex(thisSlider,type){
	var indice;
	var continueRech;
	var i=0;
	do
	{
		if(thisSlider==lastSliderChanged){
		
			indice = lastSliderChangedIndice+1;
		
			if(indice==nbSlider)indice = 0;
			
			if(getIndex(thisSlider)==indice)indice++;
			if(indice==nbSlider)indice = 0;
			
			
		}else{
			indice= indiceSuiv(thisSlider);
		}
		continueRech = false;
		if(type=="up" && getValue(indice)==0)
			continueRech=true;
		if(type=="down" && getValue(indice)==100)
			continueRech=true;
		if(i==nbSlider){
			continueRech=false;
			return -1;
			}
		
		i++;	
		lastSliderChangedIndice=indice;
		lastSliderChanged=thisSlider;
		
	}while(continueRech==true);
	return indice;
  }
  function getValue(indice){
	if(indice==0)
	return $( "#amount" ).val().substring(0,$( "#amount" ).val().length-1);
	else
	return $( "#amount"+indice ).val().substring(0,$( "#amount"+indice ).val().length-1);
  }
  
  function appelFonction(indice,val){
	switch(indice){
		case 0:s(val);break;
		case 1:s1(val);break;
		case 2:s2(val);break;
		case 3:s3(val);break;
		case 4:s4(val);break;
		case 5:s5(val);break;
		case 6:s6(val);break;
		case 7:s7(val);break;
		case 8:s8(val);break;
		case 9:s9(val);break;
	}
  }
  function reglerAutreSlider(thisSlider,ancienneValeur,nouvelleValeur){
	var valeurChange=nouvelleValeur-ancienneValeur;
	
	if(valeurChange>0){
		var i;
		for(i=1;i<=valeurChange;i++){
			var nxIn=getNextIndex(thisSlider,"up");
			appelFonction(nxIn,getValue(nxIn)-1);
			lastSliderChangedIndice=nxIn;
		}	
	}else{
		if(valeurChange < 0){
			var i;
			
			valeurChange*=-1;
			for(i=1;i<=valeurChange;i++){
				var nxIn=getNextIndex(thisSlider,"down");
					var nV = getValue(nxIn);
					nV++;
					appelFonction(nxIn,nV);
					
					
				}
				lastSliderChangedIndice=nxIn;
			}
			
		
		}
	
	lastSliderChanged=thisSlider;
  }
  
 