
  // Adding tile layer
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1Ijoic2hhcm9uOTYzIiwiYSI6ImNrYW4zb2c5cTB0eGYyeWxvbDd6Nm5zYW8ifQ.hpsECQj1iB5m_iz8AOGXhw"
  });

//Create a link to collect data from API
var link = "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information.geojson";

function getColor(d) {
    return d > 50  ? '#8B0000' :
           d > 40  ? '#FF4500' :
           d > 30  ? '#FF7F50' :
           d > 20 ? '#FFD700' :
           d > 10 ? '#FFFACD' :
                    '#98FB98';
};

var lat_long;
var capacity_markers = [];
//Grab Json Data
d3.json(link, function(response){
    
    
    for (i=0;i<response.data.stations.length; i++) {
        lat_long = [response.data.stations[i].lat,response.data.stations[i].lon];
        //console.log(lat_long);
        //console.log(response.data.stations[0].capacity);
        //console.log(response.data.stations.length)
            
        //add circle markder on each location
        capacity_markers.push(
            L.marker(lat_long 
            //     {
            //     radius: 5*response.data.stations[i].capacity,
            //     fillColor: getColor(response.data.stations[i].capacity),//"#ff7800",
            //     color: "#000",
            //     weight: 0.5,
            //     opacity: 1,
            //     fillOpacity: 0.8
            // }
            ).bindPopup("<h1>Station name: " + response.data.stations[i].name + "</h1> <hr> <h3>Capacity: " + response.data.stations[i].capacity + "</h3>")
        );
    }
    console.log(capacity_markers);



});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
        grades = [0, 10, 20, 30, 40, 50];
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};





//console.log(capacity_markers);
var capacity_layer = L.layerGroup(capacity_markers);

var baseMaps = {
    Light: light
};


var overlayMaps = {
    capacities: capacity_layer
};

// Creating map object
var map = L.map("map", {
    center: [43.6532, -79.3832],
    zoom: 12,
    layers: [light,capacity_layer]
  });
  
legend.addTo(map);


L.control.layers(baseMaps, overlayMaps).addTo(map);
