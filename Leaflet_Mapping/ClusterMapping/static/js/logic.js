// Creating map object
var myMap = L.map("map", {
  center: [43.6532, -79.3832],
  zoom: 12
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1Ijoic2hhcm9uOTYzIiwiYSI6ImNrYW4zb2c5cTB0eGYyeWxvbDd6Nm5zYW8ifQ.hpsECQj1iB5m_iz8AOGXhw"
}).addTo(myMap);

var url = "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information.geojson";


// Grab the data with d3
d3.json(url, function(response) {

  console.log(response);
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // // Loop through data
  for (var i = 0; i < response.data.stations.length; i++) {
    
    //console.log(response.data.stations[i].name);

    // Set the data location property to a variable
    var location = [response.data.stations[i].lat,response.data.stations[i].lon];
    //console.log(location)
    // Check for location property
    //if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location[0], location[1]])
        .bindPopup(response.data.stations[i].name));
      //console.log(location);
    //}

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
