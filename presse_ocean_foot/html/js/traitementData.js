var coeficient;
function getDataParPoste(poste){
	var i;
	var monTableau = new Array();

	for(i=0;i<donnees.length;i++){
		if(donnees[i].Poste==poste ||poste==""){
			
			monTableau.push([donnees[i].Joueur,parseFloat(donnees[i].temps_de_jeu_Pourcentage)*100,parseInt(donnees[i].Ballons_Joués),
			parseFloat(donnees[i].pourcentage_des_buts_du_FCN),parseInt(donnees[i].Hors_jeu),parseInt(donnees[i].Passes_décisives),parseFloat(donnees[i].pourcentage_Tirs_Cadrés),
			parseInt(donnees[i].Cartons_jaunes),parseInt(donnees[i].Cartons_rouges),parseInt(donnees[i].Ballons_perdus),parseInt(donnees[i].Ballons_gagnés)
			]);
		}
	}
	return monTableau;
}
function getDataParName(nomJoueur){
	var i;


	for(i=0;i<donnees.length;i++){
		if(donnees[i].Joueur==nomJoueur){
			
			return [donnees[i].Maillot,donnees[i].Poste,donnees[i].Age,donnees[i].Taille,
			donnees[i].Poids,donnees[i].temps_de_jeu_Pourcentage,
			donnees[i].Buts_marqués,donnees[i].Passes_décisives,
			donnees[i].Cartons_jaunes,donnees[i].Cartons_rouges
			];
		}
	}
	return null;
}
function getCoef(){
	var tab= new Array();
	var i;
	for(i=0;i<nbSlider;i++){
		if(i==0)
		tab.push(parseFloat($( "#amount" ).val().substring(0,$( "#amount" ).val().length-1))/100);
		else
		tab.push(parseFloat($( "#amount"+i ).val().substring(0,$( "#amount"+i ).val().length-1))/100);
	}
	
	return tab;

} 
function setCoef(tableauCoef){
coeficient=tableauCoef;
}
function getData(filtre){
switch (filtre){
case "attaquant" : return getDataParPoste("Attaquant");break;
case "milieu": return getDataParPoste("Milieu");break;
case "défenseur": return getDataParPoste("Défenseur");break;
case "" : return getDataParPoste("");break;
}
}

function calcule(donneesBrutes){
	var i;
	var resultat=0;
	for(i=0;i<nbSlider;i++){
		resultat=resultat+(donneesBrutes[i+1]*coeficient[i]);
	}
	return resultat;
}

function getResult(type){
	var donBrutes = getData(type);
	var i;
	var aff= new Array();
	setCoef(getCoef());
	for(i=0;i<donBrutes.length;i++){
		aff.push([donBrutes[i][0],parseFloat(calcule(donBrutes[i]).toFixed(2))]);
	}
	return aff;
}
function test(){console.log(coeficient);}