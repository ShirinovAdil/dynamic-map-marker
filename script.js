let click_count = 0;
var azerbaijan = ol.proj.fromLonLat([46.9997602, 39.3725721]);

// Create a View, set it center and zoom level
var view = new ol.View({
    center: azerbaijan,
    zoom: 7.6,
    priority: 1,
});

const iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(azerbaijan),
    name: 'Somewhere',
});

var map = new ol.Map({
    target: 'map',
    resolution: 1222.99245234375,
    renderer: 'canvas',
    view: view,
    layers: [
        new ol.layer.Tile({
            preload: 3,
            source: new ol.source.XYZ({
                priority: 2,
                cacheSize: 256,
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
        }),
    ],
    loadTilesWhileAnimating: true,
});

let sv = new ol.source.Vector({});
let lv = new ol.layer.Vector({
    source: sv,
    style: new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        })
    })
});
map.addLayer(lv);


map.on('click', function (evt) {
    let coords = ol.proj.toLonLat(evt.coordinate);
    let lat = coords[1];
    let lon = coords[0];

    const newIconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
        name: 'Somewhere new',
    });

    if (click_count > 0) {
        var features = lv.getSource().getFeatures();
        features.forEach((feature) => {
            lv.getSource().removeFeature(feature);
        });
    }

    sv.addFeature(newIconFeature);
    click_count++;
    console.log(evt.coordinate);
});

