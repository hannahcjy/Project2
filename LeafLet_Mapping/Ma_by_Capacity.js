// Creating map object
var map = L.map("map", {
    center: [43.6532, -79.3832],
    zoom: 10
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

function getColor(d) {
    return d > 50  ? '#8B0000' :
           d > 40  ? '#FF4500' :
           d > 30  ? '#FF7F50' :
           d > 20 ? '#FFD700' :
           d > 10 ? '#FFFACD' :
                    '#98FB98';
};

//Grab Json Data
d3.json(link, function(response) {

    L.geoJson(response, {
        style: function(feature){
        return {
            radius: 3*feature.properties.mag,
            fillColor: getColor(feature.properties.mag),//"#ff7800",
            color: "#000",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.8
        };
        },


        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

    onEachFeature: function(feature, layer) {
        lat_long = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
        layer.on({
        // When a feature is clicked, it provides additional info
        click: function(event) {
            layer.bindPopup("<h1>Coordinates is " + feature.geometry.coordinates + "</h1> <hr> <h2> The magnitude is " + feature.properties.mag + "</h2>");
        }
      });
    }    
    }).addTo(map);



    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
    
        var div = L.DomUtil.create('div', 'info legend');
            grades = [0, 1, 2, 3, 4, 5];
            labels = [];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    
    legend.addTo(map);






})