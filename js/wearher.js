const API_KEY = "19e78365ad1f88af9727aaeae560f585";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const log = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`;
    fetch(url).then((response) =>
        response.json().then((data) => {
            const city = document.querySelector("#weather p:first-child");
            const weather = document.querySelector("#weather p:last-child");

            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        })
    );
}

function onGeoError() {
    alert("Can't find you. No weather for you.");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=37.7290752&lon=127.1791616&appid=${API_KEY}&units=metric`;
    fetch(url).then((response) =>
        response.json().then((data) => {
            const city = document.querySelector("#weather p:first-child");
            const weather = document.querySelector("#weather p:last-child");

            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        })
    );
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
