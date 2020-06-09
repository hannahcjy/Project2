// Creating map object
var map = L.map("map", {
    center: [43.6532, -79.3832],
    zoom: 12
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1Ijoic2hhcm9uOTYzIiwiYSI6ImNrYW4zb2c5cTB0eGYyeWxvbDd6Nm5zYW8ifQ.hpsECQj1iB5m_iz8AOGXhw"
  }).addTo(map);

//Create a link to collect data from API
var link = "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information.geojson";

d3.json(link, function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();


})


