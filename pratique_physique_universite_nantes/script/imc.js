function calculIMC(){
	//Variables conseils:
	var conseilInf="Votre IMC pourrait augmenter. N'oubliez pas de bien manger et de faire du sport! Visitez le site du <a target='blank' href='https://www.univ-nantes.fr/34969603/0/fiche___pagelibre/&RH=1184341439414&RF=1184590345081'>SUAPS</a> pour plus d'informations.";
    var conseilNormal="Votre IMC est satisfaisant. N'oubliez pas de bien manger et de faire du sport, cela reste important. Visitez le site du <a target='blank' href='https://www.univ-nantes.fr/34969603/0/fiche___pagelibre/&RH=1184341439414&RF=1184590345081'>SUAPS</a> pour plus d'informations.";
    var conseilSup="Votre IMC pourrait diminuer. N'oubliez pas que manger sainement et faire du sport est essentiel. Visitez le site du <a target='blank' href='https://www.univ-nantes.fr/34969603/0/fiche___pagelibre/&RH=1184341439414&RF=1184590345081'>SUAPS</a> pour plus d'informations.";
    var conseilObesite="Votre IMC est élevé. N'oubliez pas que manger sainement et faire du sport est essentiel pour votre bien-être. Visitez le site du <a target='blank' href='https://www.univ-nantes.fr/34969603/0/fiche___pagelibre/&RH=1184341439414&RF=1184590345081'>SUAPS</a> pour plus d'informations.";
    var impossible="Votre IMC n'a pas pu être calculé";
    //Verification des entiers

    var poidsVar =  parseFloat(document.getElementById('poids').value);
    var tailleVar =  parseFloat(document.getElementById('taille').value);
    if(poidsVar>0 && tailleVar>0) {
        //le nombre est bon
        tailleVar=tailleVar/100;
        var imc = poidsVar/(tailleVar*tailleVar);
        //imc=Math.round(imc*100)/100;
        imc=imc.toFixed(2);
        //Affichage résultat
        if(parseFloat(imc)){
            document.getElementById('divResIMC').innerHTML = 'Votre IMC est de '+imc;
        }
        else{
            document.getElementById('divResIMC').innerHTML = impossible;
        }
        //Affichage conseil selon resultat
        switch(true){
            case (imc<18.5):
                document.getElementById('divConseilsIMC').innerHTML=conseilInf;
                break;
            case (imc>=18.5 && imc<25):
                document.getElementById('divConseilsIMC').innerHTML=conseilNormal;
                break;
            case (imc>=25 && imc<30):
                document.getElementById('divConseilsIMC').innerHTML=conseilSup;
                break;
            case (imc>=30):
                document.getElementById('divConseilsIMC').innerHTML=conseilObesite;
                break;
            default:
                document.getElementById('divConseilsIMC').innerHTML="";
                break;
        }
    } else {
        alert("Remplissez les champs avec des nombres positifs s'il vous plaît!");
        document.getElementById('divResIMC').innerHTML = impossible;
        document.getElementById('divConseilsIMC').innerHTML="";
    }
}