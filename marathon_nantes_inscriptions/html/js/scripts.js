	"use strict";


	function afficheImage(id) 
	{
		document.getElementById(id).style.visibility = "visible";

	}
	function cacheImage(id) 
	{
		document.getElementById(id).style.visibility = "hidden";
	}

	function affichetexte(id){
		document.getElementById(id).style.visibility= "visible";
		$('#boutonplusexpli').attr({src:'img/boutons/bouton-.svg', onclick:'cachetexte('+"'"+id+"'"+')'});
	}
	function cachetexte(id){
		document.getElementById(id).style.visibility= "hidden";
		$('#boutonplusexpli').attr({src:'img/boutons/bouton+.svg', onclick:'affichetexte('+"'"+id+"'"+')'});
	}


	function affichetexteprenom(id){
		document.getElementById(id).style.visibility= "visible";
		$('#boutonplusexpliprenoms').attr({src:'img/boutons/bouton-.svg', onclick:'cachetexteprenom('+"'"+id+"'"+')'});
	}

	function cachetexteprenom(id){
		document.getElementById(id).style.visibility= "hidden";
		$('#boutonplusexpliprenoms').attr({src:'img/boutons/bouton+.svg', onclick:'affichetexteprenom('+"'"+id+"'"+')'});
	}

	function changeAnnee2011(id, id2, id3, id4, id5, id6){
		document.getElementById(id).style.visibility = "visible";
		document.getElementById(id2).style.visibility = "visible";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id4).style.visibility = "hidden";
		document.getElementById(id5).style.visibility = "hidden";
		document.getElementById(id6).style.visibility = "hidden";
		$('#femmesdata2008').attr({src:'img/femmes/femmes_2011.svg'});
	}
	function changeAnnee2008(id, id2, id3, id4, id5, id6){

		document.getElementById(id).style.visibility = "visible";
		document.getElementById(id2).style.visibility = "visible";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id4).style.visibility = "hidden";
		document.getElementById(id5).style.visibility = "hidden";
		document.getElementById(id6).style.visibility = "hidden";
		$('#femmesdata2008').attr({src:'img/femmes/femmes_2008.svg'});

	}
	function changeAnnee2015(id, id2, id3, id4, id5, id6){
		document.getElementById(id).style.visibility = "visible";
		document.getElementById(id2).style.visibility = "visible";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id4).style.visibility = "hidden";
		document.getElementById(id5).style.visibility = "hidden";
		document.getElementById(id6).style.visibility = "hidden";
		$('#femmesdata2008').attr({src:'img/femmes/femmes_2015.svg'});

	}
var nom_region="";

function init_page(region){
	$('#boutonAnnee2008pregion').css({visibility:'visible'});
	$('#femmmestexte2008region').css({visibility:'visible'});	
	$('#boutonAnnee2015pregion').css({visibility:'hidden'});
	$('#boutonAnnee2011pregion').css({visibility:'hidden'});
	$('#femmmestexte2011region').css({visibility:'hidden'});
	$('#femmmestexte2015region').css({visibility:'hidden'});
	page_suivante(region,2008);
}
function page_suivante(region, annee){
	nom_region=region;
	$('#test').css({visibility:'visible'});
	$('#image_centre').attr({src:'img/Images2.1/Images_centre/'+region+'.svg'});
	if(annee!='2008'){
		$('#texte_gauche').attr({src:'img/Images2.1/Texte_Gauche/'+region+''+annee+'.svg'});
		$('#texte_gauche').css({visibility:'visible'});
	}else{
		$('#texte_gauche').css({visibility:'hidden'});
	}
	$('#map_france').attr({src:'img/Images2.1/Map_France/'+region+'.svg'});
	$('#titre_partie_deux').attr({src:'img/Images2.1/Titre/'+region+'.svg'});
	$('#texte_milieu').attr({src:'img/Images2.1/Texte_Milieu/'+region+''+annee+'.svg'});
}

function changeAnnee2015region(id, id2, id3, id4, id5, id6){
		document.getElementById(id).style.visibility = "visible";
		document.getElementById(id2).style.visibility = "visible";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id4).style.visibility = "hidden";
		document.getElementById(id5).style.visibility = "hidden";
		document.getElementById(id6).style.visibility = "hidden";
		page_suivante(nom_region,2015);

	}
	function changeAnnee2011region(id, id2, id3, id4, id5, id6){
		document.getElementById(id).style.visibility = "visible";
		document.getElementById(id2).style.visibility = "visible";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id4).style.visibility = "hidden";
		document.getElementById(id5).style.visibility = "hidden";
		document.getElementById(id6).style.visibility = "hidden";
		page_suivante(nom_region,2011);
	}
	function changeAnnee2008region(id, id2, id3, id4, id5, id6){
		document.getElementById(id).style.visibility = "visible";
		document.getElementById(id2).style.visibility = "visible";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id3).style.visibility = "hidden";
		document.getElementById(id4).style.visibility = "hidden";
		document.getElementById(id5).style.visibility = "hidden";
		document.getElementById(id6).style.visibility = "hidden";
		page_suivante(nom_region,2008);
	}
function retourpage(){
	$('#test').css({visibility:'hidden'});
	$('#boutonAnnee2008pregion').css({visibility:'hidden'});
	$('#femmmestexte2008region').css({visibility:'hidden'});	
	$('#boutonAnnee2015pregion').css({visibility:'hidden'});
	$('#boutonAnnee2011pregion').css({visibility:'hidden'});
	$('#femmmestexte2011region').css({visibility:'hidden'});
	$('#femmmestexte2015region').css({visibility:'hidden'});
	$('#texte_gauche').css({visibility:'hidden'});
}

