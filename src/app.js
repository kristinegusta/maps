import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const btn = document.querySelector("#map")
const adressInputField = document.querySelector("#adress")
const coordinatesContainer = document.querySelector("#coordinates-container")
const weatherContainer = document.querySelector("#weather-container")

const createMap = (data) => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3JpaWthMiIsImEiOiJja3pxcTJvdTgwY3o2MnBtdW0yNXRjbWIyIn0.wZxIsEtWF9lU5MKLTRuQPQ';
    const map = new mapboxgl.Map({
        container: 'map-container', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: data.features[0].geometry.coordinates, // starting position [lng, lat]
        zoom: 12 // starting zoom
    });
    new mapboxgl.Marker().setLngLat(data.features[0].geometry.coordinates).addTo(map);
    //for the nice searchbor in the corner

    let geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl });
    map.addControl(geocoder);

    //console.log(document.querySelector(".mapboxgl-ctrl-geocoder--input").value)
}
const fetchWeather = (lon, lat) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5b2169bfcda22cbe725901e9cb58f31c`)
        .then(response => response.json())
        .then(data => {
            let tempInC = data.main.temp - 273.15
            weatherContainer.innerHTML = ""
            weatherContainer.insertAdjacentHTML('beforeend', `The weather: ${data.weather[0].description} ${tempInC.toFixed(2)} &#8451;`)

        })
        .catch(error => {
            console.log('There was an error!', error)
        })
}
const fetchAdress = (adressArray) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${adressArray[0]}%20${adressArray[1]}%20${adressArray[2]}%20${adressArray[3]}%20${adressArray[4]}.json?access_token=pk.eyJ1Ijoia3JpaWthMiIsImEiOiJja3pxdDFjOGQwYmV5MnZvOXI5bm1qemV3In0.jEvhkABH1R8bftOK9d3Fkw`)
        .then(response => response.json())
        .then(data => {
            createMap(data)
            coordinatesContainer.innerHTML = ""
            coordinatesContainer.insertAdjacentHTML("beforeend", `
            Latitude ${data.features[0].geometry.coordinates[1]} Longitude ${data.features[0].geometry.coordinates[0]}
            `)
            weatherContainer.innerHTML = ""
            document.querySelector(".btn-container").innerHTML = ""
            document.querySelector(".btn-container").insertAdjacentHTML("beforeend", `<button type="button" id="weather">Weather</button>`)

            const weatherButton = document.querySelector("#weather")
            weatherButton.addEventListener('click', (event) => {
                fetchWeather(data.features[0].geometry.coordinates[0], data.features[0].geometry.coordinates[1])

            })
        })
        .catch(error => {
            console.log('There was an error!', error)
        })
}

btn.addEventListener('click', (event) => {
    let adressArray = adressInputField.value.split(" ")
    fetchAdress(adressArray)
})


//api key for weather 5b2169bfcda22cbe725901e9cb58f31c
// https://api.openweathermap.org/data/2.5/weather?lat=24.1040147179&lon=56.9494532218&appid=5b2169bfcda22cbe725901e9cb58f31c