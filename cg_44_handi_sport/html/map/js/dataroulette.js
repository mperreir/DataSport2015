var map;
var tabMarkerClub = [];
var tabMarkerConseil = [];
var tabMarkerEtablissement = [];

var clubActivated = false;
var conseilActivated = true;
var etabActivated = true;

var docClub;
var docConseil;
var docEtablissement;

function initialisation() {
   /*map = L.map('map').setView([47.0797861, -2.0388789], 8);
    L.tileLayer('https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}', {
        maxZoom: 18,
        attribution: 'Hyblab2015',
        id: 'wicey.a7b0541c',
        token: 'pk.eyJ1Ijoid2ljZXkiLCJhIjoiNHdmYkY1USJ9.nkVYKTEjvWAt9p7u6TBI1A#9'
    }).addTo(map);*/

    // set up the map
    map = new L.Map('map');

    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='<a href="http://openstreetmap.org">OpenStreetMap</a> Hyblab';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

    // start the map in South-East England
    map.setView(new L.LatLng(51.3, 0.7),9);
    map.addLayer(osm);

    // Charger et afficher le fichier KML de limitation de la Loire Atlantique
    var kmlLayer = new L.KML("./44.kml", {
        async: true
    });

    kmlLayer.on("loaded", function(e) {
        map.fitBounds(e.target.getBounds());
    });

    map.addLayer(kmlLayer);

    updateCalqueClub(true);
    updateCalqueConseil();
    updateCalqueEtablissements(true);
}

function updateCalqueClub(activated) {
    if (activated) clubActivated = !clubActivated;
    if (clubActivated) {
        $('#calque1p').attr('class', 'calqueActivated');
        if (docClub == null) {
            var req = new XMLHttpRequest();
            req.open("GET", "data/dataClub.json", true);
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    docClub = JSON.parse(req.responseText);
                    addDataClub(docClub);
                }
            }; // the handler 
            req.send(null);

            
        } else {
            addDataClub(docClub);
        }
        disableFiltresClubs(false);
    } else {
        $('#calque1p').attr('class', 'calqueNonActivated');
        removeDataClub();
        disableFiltresClubs(true);
    }
}

function updateCalqueConseil() {
    conseilActivated = !conseilActivated;
    if (conseilActivated) {
        $('#calque2p').attr('class', 'calqueActivated');
        if (docConseil == null) {
            var req = new XMLHttpRequest();
            req.open("GET", "data/dataConseilGeneral.json", true);
            req.onreadystatechange = addDataConseilHandler; // the handler 
            req.send(null);

            function addDataConseilHandler() {
                if (req.readyState == 4) {
                    docConseil = JSON.parse(req.responseText);
                    addDataConseil(docConseil);
                }
            }
        } else {
            addDataConseil(docConseil);
        }
    } else {
        $('#calque2p').attr('class', 'calqueNonActivated');
        removeDataConseil();
    }
}

function updateCalqueEtablissements(activated) {
    if (activated) etabActivated = !etabActivated;
    if (etabActivated) {
        $('#calque3p').attr('class', 'calqueActivated');
        if (docEtablissement == null) {
            var req = new XMLHttpRequest();
            req.open("GET", "data/dataEtablissement.json", true);
            req.onreadystatechange = addDataEtablissementHandler; // the handler 
            req.send(null);

            function addDataEtablissementHandler() {
                if (req.readyState == 4) {
                    docEtablissement = JSON.parse(req.responseText);
                    addDataEtablissement(docEtablissement);
                }
            }
        } else {
            addDataEtablissement(docEtablissement);
        }
        disableFiltresEtablissements(false);
    } else {
        $('#calque3p').attr('class', 'calqueNonActivated');
        removeDataEtablissement();
        disableFiltresEtablissements(true);
    }
}

function addDataClub(doc) {

    var filtreClubType = (function(row) {
        var choix1 = document.getElementById('type_club_1');
        var choix2 = document.getElementById('type_club_2');
        var choix3 = document.getElementById('type_club_3');
        var choix4 = document.getElementById('type_club_4');
        var type = row.Type || 'null';
        if (choix1.checked) return 1;
        if (choix2.checked) return (type == choix2.value);
        if (choix3.checked) return (type == choix3.value);
        if (choix4.checked) return (type == choix4.value);
    });

    var filtreClubAccueil = (function(row) {
        var choix1 = document.getElementById('accueil_club_1');
        var choix2 = document.getElementById('accueil_club_2');
        var choix3 = document.getElementById('accueil_club_3');
        var choix4 = document.getElementById('accueil_club_4');
        var accueil = row.Accueil || 'null';
        if (choix1.checked) return 1;
        if (choix2.checked) return (accueil == choix2.value);
        if (choix3.checked) return (accueil == choix3.value);
        if (choix4.checked) return (accueil == choix4.value);
    });

    var filtreClubHandi = (function(row) {
        var choix1 = document.getElementById('handi_club_1');
        var choix2 = document.getElementById('handi_club_2');
        var choix3 = document.getElementById('handi_club_3');
        var handi = row.Handiguide || 'null';
        if (choix1.checked) return 1;
        if (choix2.checked) return (handi == choix2.value);
        if (choix3.checked) return (handi == choix3.value);
    });

    var filtreClubCategorie = (function(row) {
        var categorie = document.getElementById('categorie_club').value;
        var categorie_data = row.Categorie || 'null';
        if (categorie == "Tous") return 1;
        return (categorie_data == categorie);
    });


    var i = 0;

    //Boucle sur tous les clubs
    doc.filter(filtreClubType).filter(filtreClubAccueil).filter(filtreClubHandi).filter(filtreClubCategorie).forEach(function(entry) {

        var url_image = 'img/icon_map/clubs/club_entier';

        switch (entry.Categorie) {
            case "ATHLÉTISME":
                url_image += '_vertf';
                break;
            case "AUTRES SPORTS":
                url_image += '_violet';
                break;
            case "CYCLE ET SPORTS MÉCANIQUES":
                url_image += '_rose';
                break;
            case "FITNESS ET ACTIVITÉS GYMNIQUES":
                url_image += '_noir';
                break;
            case "NATATION":
                url_image += '_bleuc';
                break;
            case "SPORTS COLLECTIFS":
                url_image += '_bleuf';
                break;
            case "SPORTS DE COMBAT":
                url_image += '_rouge';
                break;
            case "SPORTS DE NATURE":
                url_image += '_vertc';
                break;
            case "SPORTS DE PRÉCISIONS":
                url_image += '_orange';
                break;
            case "SPORTS DE RAQUETTES":
                url_image += '_jaune';
                break;
            default:
                url_image += 'img/icon_map/default_image';
                break;
        }

        switch (entry.Accueil) {
            case "REGULIER":
                url_image += '_grand';
                break;
            case "PEUT ACCUEILLIR":
                url_image += '_moyen';
                break;
            case "PONCTUEL":
                url_image += '_petit';
                break;
            default:
                url_image += '_grand';
                break;
        }

        url_image += '.png';

        var iconClub = L.icon({
            iconUrl: url_image,

            iconSize: [26, 26], // size of the icon
            iconAnchor: [13, 13], // point of the icon which will correspond to marker's location
            popupAnchor: [0, 13] // point from which the popup should open relative to the iconAnchor
        });

        var marker = L.marker([entry.Latitude, entry.Longitude], {
                icon: iconClub,
                opacity: 0.85
            }).addTo(map).on('mousedown', function onClick(e) {
                document.getElementById('title_show').innerHTML = entry.Nom;
                if (entry.Type == "LES DEUX") document.getElementById('type_show').innerHTML = "HANDISPORT ET SPORT ADAPTÉ";
                else document.getElementById('type_show').innerHTML = entry.Type;
                document.getElementById('affil_show').innerHTML = 'Affilié : ' + entry.Affiliation;
                document.getElementById('adress_show').innerHTML = entry.Adresse + ' ' + entry.CodePostal + ' <span style="font-weight: bold;">' + entry.Commune + '</span>';
                document.getElementById('discipline_show').innerHTML = 'DISCIPLINE : ' + entry.Discipline;
                document.getElementById('cnds_show').innerHTML = 'CNDS : ' + entry.CNDS;
                // mettre image handi
                if (entry.Handiguide == "OUI") document.getElementById('handi_show').src = 'img/handiguide.png';
                else document.getElementById('handi_show').src = 'img/empty.png';
                document.getElementById('accueil_show').innerHTML = 'ACCUEIL ' + entry.Accueil;
                document.getElementById('nb_show').innerHTML = 'Nombre d\'adhérents : ' + entry.Nombre;
                document.getElementById('cat_show').innerHTML = 'Catégorie sportive : ' + entry.Categorie;

                $("#wrapper1").toggleClass("toggled", true);
                $("#wrapper2").toggleClass("toggled", true);
                $("#wrapper3").toggleClass("toggled", false);

            }).on('mouseover', function onHover(e) {
                document.getElementById('name_show').innerHTML = entry.Nom;
            })
            .on('mouseout', function offHover(e) {
                document.getElementById('name_show').innerHTML = null;
            });

        tabMarkerClub[i] = marker;
        i++;
    }, this)

}

function addDataConseil(doc) {
    var i = 0;

    doc.forEach(function(entry) {
        var url_image = 'img/icon_map/conseil/conseil_rond.png'

        var iconConseil = L.icon({
            iconUrl: url_image,

            iconSize: [52, 52], // size of the icon
            iconAnchor: [26, 26], // point of the icon which will correspond to marker's location
            popupAnchor: [26, 26] // point from which the popup should open relative to the iconAnchor
        });


        var marker = L.marker([entry.Latitude, entry.Longitude], {
            icon: iconConseil,
            opacity: 0.95
        }).addTo(map).on('mousedown', function onClick(e) {
            document.getElementById('title_show').innerHTML = entry.Nom;
            document.getElementById('type_show').innerHTML = 'Type de handicap : ' + entry.Handicap;
            document.getElementById('affil_show').innerHTML = 'Délégation : ' + entry.Delegation;
            document.getElementById('adress_show').innerHTML = 'Commune : ' + entry.Commune + ' ' + entry.CP;
            document.getElementById('discipline_show').innerHTML = 'Intervention : ' + entry.Intervention;
            document.getElementById('cnds_show').innerHTML = 'Age : ' + entry.Age;
            document.getElementById('cat_show').innerHTML = 'Cycle par an : ' + entry.Cycleparan;
            document.getElementById('accueil_show').innerHTML = 'Seances par cycle : ' + entry.Seancesparcycle;
            document.getElementById('nb_show').innerHTML = 'Nombre total dinterventions par an : ' + entry.Nbtotalinterventionparan;
            document.getElementById('handi_show').src = 'img/empty.png';

            $("#wrapper1").toggleClass("toggled", true);
            $("#wrapper2").toggleClass("toggled", true);
            $("#wrapper3").toggleClass("toggled", false);

        }).on('mouseover', function onHover(e) {
            document.getElementById('name_show').innerHTML = entry.Nom;
        }).on('mouseout', function offHover(e) {
            document.getElementById('name_show').innerHTML = '';
        });


        tabMarkerConseil[i] = marker;

        i++;
    }, this)
}

function addDataEtablissement(doc) {
    var filtreEtablissementPopulation = (function(row) {
        var choix1 = document.getElementById('pop_etab_1');
        var choix2 = document.getElementById('pop_etab_2');
        var choix3 = document.getElementById('pop_etab_3');
        var population = row.Population || 'null';
        if (choix1.checked) return 1;
        if (choix2.checked) return (population == choix2.value);
        if (choix3.checked) return (population == choix3.value);

    });

    var filtreEtablissementAccueil = (function(row) {
        var choix1 = document.getElementById('accueil_etab_1');
        var choix2 = document.getElementById('accueil_etab_2');
        var choix3 = document.getElementById('accueil_etab_3');
        var accueil = row.Accueil || 'null';
        if (choix1.checked) return 1;
        if (choix2.checked) return (accueil == choix2.value);
        if (choix3.checked) return (accueil == choix3.value);

    });


    var i = 0;
    doc.filter(filtreEtablissementPopulation).filter(filtreEtablissementAccueil).forEach(function(entry) {

        var url_image = 'img/icon_map/etablissements/etab_triangle';

        switch (entry.Accueil) {
            case "JOURNEE":
                url_image += '_petit';
                break;
            case "JOURNEE/NUIT":
                url_image += '_grand';
                break;
            default:
                url_image = 'img/icon_map/default_image';
                break;
        }

        url_image += '.png';

        var iconEtab = L.icon({
            iconUrl: url_image,

            iconSize: [26, 26], // size of the icon
            iconAnchor: [13, 13], // point of the icon which will correspond to marker's location
            popupAnchor: [0, 13] // point from which the popup should open relative to the iconAnchor
        });
        var marker = L.marker([entry.Latitude, entry.Longitude], {
            icon: iconEtab,
            opacity: 0.9
        }).addTo(map).on('mousedown', function onClick(e) {
            document.getElementById('title_show').innerHTML = entry.Nom;
            document.getElementById('type_show').innerHTML = 'Type établissement : ' + entry.TypeEtablissement;
            document.getElementById('affil_show').innerHTML = 'Population : ' + entry.Population;
            document.getElementById('adress_show').innerHTML = 'Adresse complète : ' + entry.Adresse + ' ' + entry.CodePostal + ' <span style="font-weight: bold;">' + entry.Commune + '</span>';
            document.getElementById('discipline_show').innerHTML = 'Handicap : ' + entry.Handicap;
            document.getElementById('cnds_show').innerHTML = 'Accueil : ' + entry.Accueil;
            document.getElementById('handi_show').innerHTML = '';
            document.getElementById('accueil_show').innerHTML = '';
            document.getElementById('nb_show').innerHTML = '';
            document.getElementById('cat_show').innerHTML = '';

            $("#wrapper1").toggleClass("toggled", true);
            $("#wrapper2").toggleClass("toggled", true);
            $("#wrapper3").toggleClass("toggled", false);

        }).on('mouseover', function onHover(e) {
            document.getElementById('name_show').innerHTML = entry.Nom;
        }).on('mouseout', function offHover(e) {
            document.getElementById('name_show').innerHTML = '';
        });


        tabMarkerEtablissement[i] = marker;
        i++;
    }, this)
}

function removeDataClub() {
    tabMarkerClub.forEach(function(entry) {
        map.removeLayer(entry);
    }, this)

}

function removeDataConseil() {
    tabMarkerConseil.forEach(function(entry) {
        map.removeLayer(entry);
    }, this)
}

function removeDataEtablissement() {
    tabMarkerEtablissement.forEach(function(entry) {
        map.removeLayer(entry);
    }, this)
}

function disableFiltresClubs(value) {
    document.getElementById("type_club_1").disabled = value;
    document.getElementById("type_club_2").disabled = value;
    document.getElementById("type_club_3").disabled = value;
    document.getElementById("type_club_4").disabled = value;
    document.getElementById("accueil_club_1").disabled = value;
    document.getElementById("accueil_club_2").disabled = value;
    document.getElementById("accueil_club_3").disabled = value;
    document.getElementById("accueil_club_4").disabled = value;
    document.getElementById("handi_club_1").disabled = value;
    document.getElementById("handi_club_2").disabled = value;
    document.getElementById("handi_club_3").disabled = value;
    document.getElementById("categorie_club").disabled = value;
}

function disableFiltresEtablissements(value) {
    document.getElementById("pop_etab_1").disabled = value;
    document.getElementById("pop_etab_2").disabled = value;
    document.getElementById("pop_etab_3").disabled = value;
    document.getElementById("accueil_etab_1").disabled = value;
    document.getElementById("accueil_etab_2").disabled = value;
    document.getElementById("accueil_etab_3").disabled = value;
}

function updateFiltreClub() {
    removeDataClub();
    updateCalqueClub(false);
}

function updateFiltreEtablissement() {
    removeDataEtablissement();
    updateCalqueEtablissements(false);
}


google.maps.event.addDomListener(window, 'load', initialisation);

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
