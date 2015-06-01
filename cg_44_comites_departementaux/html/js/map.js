var map = L.map('map').setView([47.348, -1.7419961], 9);
L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
    subdomains: ['otile1','otile2','otile3','otile4']
}).addTo(map);
var greenIcon = L.icon({
    iconUrl: 'js/img/leaf-green.png',
    shadowUrl: 'js/img/leaf-shadow.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var redIcon = L.icon({
    iconUrl: 'js/img/leaf-red.png',
    shadowUrl: 'js/img/leaf-shadow.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var orangeIcon = L.icon({
    iconUrl: 'js/img/leaf-orange.png',
    shadowUrl: 'js/img/leaf-shadow.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var help;

d3.json("js/data/data.json",function(err,data){
    help = data;
    data.data.FFGYM.forEach(function(club){
        var marker = L.marker([club.latitude,club.longitude],{icon:orangeIcon}).addTo(map).bindPopup("<b>"+club.club+"</b>"+" affilié à la <b>FFGYM</b>"+"<br>"+club.adresse+", "+club.codepostal);
    })
    data.data.fscf.forEach(function(club){
        var marker = L.marker([club.latitude,club.longitude],{icon:redIcon}).addTo(map).bindPopup("<b>"+club.club+"</b>"+" affilié à la <b>FSCF</b>"+"<br>"+club.adresse+", "+club.codepostal);
    })
    data.data.ufolep.forEach(function(club){
        var marker = L.marker([club.latitude,club.longitude],{icon:greenIcon}).addTo(map).bindPopup("<b>"+club.club+"</b>"+" affilié à l'<b>UFOLEP</b>"+"<br>"+club.adresse+", "+club.codepostal);
    })
})

function default_clubs(){
    map.remove();
    map = L.map('map').setView([47.348, -1.7419961], 9);
    L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
        subdomains: ['otile1','otile2','otile3','otile4']
    }).addTo(map);
    help.data.FFGYM.forEach(function(club){
        var marker = L.marker([club.latitude,club.longitude],{icon:orangeIcon}).addTo(map).bindPopup(club.club+" affilié à la FFGYM"+"<br>"+club.adresse+", "+club.codepostal);
    })
    help.data.fscf.forEach(function(club){
        var marker = L.marker([club.latitude,club.longitude],{icon:redIcon}).addTo(map).bindPopup(club.club+" affilié à la FSCF"+"<br>"+club.adresse+", "+club.codepostal);
    })
    help.data.ufolep.forEach(function(club){
        var marker = L.marker([club.latitude,club.longitude],{icon:greenIcon}).addTo(map).bindPopup(club.club+" affilié à l'UFOLEP"+"<br>"+club.adresse+", "+club.codepostal);
    })
}

function fscf_club(){
    map.remove();
    map = L.map('map').setView([47.348, -1.7419961], 9);
    L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
        subdomains: ['otile1','otile2','otile3','otile4']
    }).addTo(map);
    help.data.fscf.forEach(function(club){
        var marker = L.marker([club.latitude,club.longitude],{icon:redIcon}).addTo(map).bindPopup("<b>"+club.club+"</b>"+" affilié à la <b>FSCF</b>"+"<br>"+club.adresse+", "+club.codepostal);
    })
}
function ffgym_club(){
    map.remove();
    map = L.map('map').setView([47.348, -1.7419961], 9);
    L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
        subdomains: ['otile1','otile2','otile3','otile4']
    }).addTo(map);
    help.data.FFGYM.forEach(function(club){
        var marker = L.marker([club.latitude,club.longitude],{icon:orangeIcon}).addTo(map).bindPopup("<b>"+club.club+"</b>"+" affilié à la <b>FFGYM</b>"+"<br>"+club.adresse+", "+club.codepostal);
    })
}
function ufolep_club(){
    map.remove();
    map = L.map('map').setView([47.348, -1.7419961], 9);
    L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
        subdomains: ['otile1','otile2','otile3','otile4']
    }).addTo(map);
    help.data.ufolep.forEach(function(club){
        var marker = L.marker([club.latitude,club.longitude],{icon:greenIcon}).addTo(map).bindPopup("<b>"+club.club+"</b>"+" affilié à l'<b>UFOLEP</b>"+"<br>"+club.adresse+", "+club.codepostal);
    })
}