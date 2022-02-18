const btn = document.querySelector("#map");
const mapContainer = document.querySelector("#map-container");
const adressInputField = document.querySelector("#adress");
//The adress format should be: Street Streetnumber zipcode City Country
const fetchAdress = (adressArray)=>{
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${adressArray[0]}%20${adressArray[1]}%20${adressArray[2]}%20${adressArray[3]}%20${adressArray[4]}.json?access_token=pk.eyJ1Ijoia3JpaWthMiIsImEiOiJja3pxdDFjOGQwYmV5MnZvOXI5bm1qemV3In0.jEvhkABH1R8bftOK9d3Fkw`).then((response)=>response.json()
    ).then((data)=>{
        mapboxgl.accessToken = 'pk.eyJ1Ijoia3JpaWthMiIsImEiOiJja3pxcTJvdTgwY3o2MnBtdW0yNXRjbWIyIn0.wZxIsEtWF9lU5MKLTRuQPQ';
        const map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: data.features[0].geometry.coordinates,
            zoom: 18 // starting zoom
        });
        new mapboxgl.Marker().setLngLat(data.features[0].geometry.coordinates).addTo(map);
        //console.log(`https://api.mapbox.com/geocoding/v5/mapbox.places/${adressArray[0]}%20${adressArray[1]}%20${adressArray[2]}%20${adressArray[3]}%20${adressArray[4]}.json?access_token=pk.eyJ1Ijoia3JpaWthMiIsImEiOiJja3pxdDFjOGQwYmV5MnZvOXI5bm1qemV3In0.jEvhkABH1R8bftOK9d3Fkw`)
        map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }));
    }).catch((error)=>{
        console.log('There was an error!', error);
    });
};
btn.addEventListener('click', (event)=>{
    let adressArray = adressInputField.value.split(" ");
    fetchAdress(adressArray);
}) //fetch stuff here
 //example url  https://api.mapbox.com/geocoding/v5/mapbox.places/brussel.json?access_token=pk.eyJ1Ijoia3JpaWthMiIsImEiOiJja3pxdDFjOGQwYmV5MnZvOXI5bm1qemV3In0.jEvhkABH1R8bftOK9d3Fkw
 //You can either submit the components in the same order as you would use for an address in the United States ({house number} {street} {city} {state} {zip}),
 //or you can follow local address formatting standards for those countries. Fraunhoferstraße 6 80469 München Bavaria
 //2%20Lincoln%20Memorial%20Cir%20NW
 //https://api.mapbox.com/geocoding/v5/mapbox.places/Fraunhoferstraße%206%2080469%20München%20Bavaria.json?access_token=pk.eyJ1Ijoia3JpaWthMiIsImEiOiJja3pxdDFjOGQwYmV5MnZvOXI5bm1qemV3In0.jEvhkABH1R8bftOK9d3Fkw
;

//# sourceMappingURL=index.816e7b21.js.map
