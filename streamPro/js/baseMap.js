var mapboxurl =
"https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2xlZXB5Z2dnIiwiYSI6ImNqd3c1eG1vcTBnY2ozenFzeXplODIxMGIifQ.XYsbgqbl7JQcmopfr9T5hQ",
mapbox = L.tileLayer(mapboxurl, {
maxZoom: 18,
opacity: 0.8,
nowrap: true
});

var leafletMap = L.map("mapContainer", {
maxZoom: 17,
minZoom: 2,
maxBounds: [[-85, -180], [85, 180]],
noWrap: true,
layers: mapbox
}).setView([40.74, -73.962], 12);

var drawnItems = new L.FeatureGroup();
leafletMap.addLayer(drawnItems);

var featureGroup = L.featureGroup().addTo(leafletMap);
var drawControl = new L.Control.Draw({
draw: {
polyline: false,
polygon: false,
circle: false,
marker: false,
circlemarker: false
},
edit: {
featureGroup: featureGroup,
remove: true, //
edit: false //
}
}).addTo(leafletMap);