var taxiEvevts_layer = new L.layerGroup();

(L.circle(L.latLng(40.714, -73.962), 3, {
    color: '#f00',
    fillColor: '#f00',
    fillOpacity: 1
})).addTo(taxiEvevts_layer);

var tag = taxiEvevts_layer.addTo(leafletMap);
// leafletMap.removeLayer(tag);