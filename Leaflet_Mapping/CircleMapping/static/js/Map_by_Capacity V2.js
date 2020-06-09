// Creating map object
var map = L.map("map", {
    center: [43.6532, -79.3832],
    zoom: 12
  });
  
  // Adding tile layer
var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1Ijoic2hhcm9uOTYzIiwiYSI6ImNrYW4zb2c5cTB0eGYyeWxvbDd6Nm5zYW8ifQ.hpsECQj1iB5m_iz8AOGXhw"
  });

var baseMaps = {
  Light: light
};

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
var bike_coordinates = [];
var top10_coordinates = [];
var capacity_layer;
var overlayMaps;
var station_capacity = [];
var top10_station_capacity = [];
//Grab Json Data
d3.json(link, function(response){
    

    for (i=0;i<response.data.stations.length; i++) {
        lat_long = [response.data.stations[i].lat,response.data.stations[i].lon];
        //console.log(lat_long);
        //console.log(response.data.stations[0].capacity);
        //console.log(response.data.stations.length)
            
        //add circle markder on each location
        L.circle(lat_long, {
            radius: 5*response.data.stations[i].capacity,
            fillColor: getColor(response.data.stations[i].capacity),//"#ff7800",
            color: "#000",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.8
        }).bindPopup("<h1>Station name: " + response.data.stations[i].name + "</h1> <hr> <h3>Capacity: " + response.data.stations[i].capacity + "</h3>")
        .addTo(map);

    }






    
    // sort Json by capacity and slice for top 10 stations
    function sortByProperty(property){  
        return function(a,b){  
           if(a[property] > b[property])  
              return -1;  
           else if(a[property] < b[property])  
              return 1;  
       
           return 0;  
        }  
     }
    var top10_cap = response.data.stations.sort(sortByProperty("capacity")).slice(0,10);
    console.log(top10_cap);
    //Create 2nd Layer for top 10 locations
    for (i=0;i<top10_cap.length; i++) {
        top10_station_capacity.push(response.data.stations[i].capacity);
        top10_lat_long=[top10_cap[i].lat,top10_cap[i].lon];
            
        //add circle markder on each location
        top10_coordinates.push(
            L.marker(top10_lat_long).bindPopup("<h1>Station name: " + top10_cap[i].name + "</h1> <hr> <h3>Capacity: " + top10_cap[i].capacity + "</h3>")
        );
    }
    //console.log(station_capacity);
    //console.log(bike_coordinates[100][0]);
    top10_layer = L.layerGroup(top10_coordinates);


    overlayMaps = {
        //capacities: bike_layer,
        top10_cap: top10_layer
    };
    L.control.layers(baseMaps, overlayMaps).addTo(map);


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
    
    legend.addTo(map);
});




// })