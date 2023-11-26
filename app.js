let input = document.getElementById("w-input");
let cityName = document.getElementById("city");
let temp = document.getElementById("temp");
let weatherCon = document.getElementById("weatherCon");
let weatherImage = document.getElementById("weatherImage");
let windSpeed = document.getElementById("windSpeed");
let humidity = document.getElementById("humidity");
let weatherVis = document.getElementById("weatherVis");

const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords;
            resolve({ latitude, longitude });
        }),
            (err) => {
                reject(err);
            };
    });
};
const renderData = async () => {
    try {
        let data = await getLocation();
        let apiKey = "5b07209d81ced7781dec4ec53ad48ded"
        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${apiKey}&units=metric`
        //   console.log(api);
        let response = await axios(api)
        console.log(response.data);
        let apiData = response.data;
        let { name, main, wind, visibility } = apiData;
        city.innerHTML = `<h4 >${name} </h4>`;
        temp.innerHTML = `<h6 class="display-4 mb-0 font-weight-bold" >${Math.round(
            main.temp
        )} °C</h6>`;
        windSpeed.innerHTML = `<span class="ms-1" id="windSpeed">${Math.round(
            wind.speed
        )} km/h</span>`;
        humidity.innerHTML = `<span class="ms-1" id="humidity">${Math.round(
            main.humidity
        )} </span> %`;
        weatherVis.innerHTML = `<span class="ms-1" id="weatherVis">${visibility / 1000
            } km </span>`;
        // console.log("Api   > " + apiData.weather);
        for (let i = 0; i < apiData.weather.length; i++) {
            console.log(apiData.weather[i]);
            weatherCon.innerHTML = `<h4 class="text-capitalize">${apiData.weather[i].description} </h4>`;
            if (apiData.weather[i].description == "haze") {
                weatherImage.src = "images/haze.png";
            } else if (apiData.weather[i].description == "smoke") {
                weatherImage.src = "images/smoke.png";
            } else if (apiData.weather[i].description == "light rain") {
                weatherImage.src = "images/rain.png";
            } else if (apiData.weather[i].description == "clear sky") {
                weatherImage.src = "images/clear.png";
            } else if (apiData.weather[i].description == "scattered clouds") {
                weatherImage.src = "images/clouds.png";
            } else if (apiData.weather[i].description == "broken clouds") {
                weatherImage.src = "images/br-clouds.png";
            }
            // weatherCon.innerHTML = `<h2 >${Math.round(main.temp)} °C</h2>`
        }
    } catch (err) {
        console.log(err);
    }
};
renderData();
const getWeather = () => {
    return new Promise((resolve, reject) => {
        let apiKey = "5b07209d81ced7781dec4ec53ad48ded";
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
        fetch(api)
            .then((response) => response.json())
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
const fetchWeather = async () => {
    try {
        if (input.value.trim()) {
            let data = await getWeather();
            console.log(data.main.temp);
            let { name, main, wind, visibility } = data;
            city.innerHTML = `<h4 >${name} </h4>`;
            temp.innerHTML = `<h6 class="display-4 mb-0 font-weight-bold" >${Math.round(
                main.temp
            )} °C</h6>`;
            windSpeed.innerHTML = `<span class="ms-1" id="windSpeed">${Math.round(
                wind.speed
            )} km/h</span>`;
            humidity.innerHTML = `<span class="ms-1" id="humidity">${Math.round(
                main.humidity
            )} </span> %`;
            weatherVis.innerHTML = `<span class="ms-1" id="weatherVis">${visibility / 1000
                } km </span>`;
            for (let i = 0; i < data.weather.length; i++) {
                console.log(data.weather[i]);
                weatherCon.innerHTML = `<h4 class="text-capitalize">${data.weather[i].description} </h4>`;
                if (data.weather[i].description == "haze") {
                    weatherImage.src = "images/haze.png";
                } else if (data.weather[i].description == "smoke") {
                    weatherImage.src = "images/smoke.png";
                } else if (data.weather[i].description == "light rain") {
                    weatherImage.src = "images/rain.png";
                } else if (data.weather[i].description == "clear sky") {
                    weatherImage.src = "images/clear.png";
                } else if (data.weather[i].description == "overcast clouds" || data.weather[i].description == "scattered clouds") {
                    weatherImage.src = "images/clouds.png";
                } else if (data.weather[i].description == "broken clouds") {
                    weatherImage.src = "images/br-clouds.png";
                }
                else if (data.weather[i].description == "few clouds") {
                    weatherImage.src = "images/few-clouds.png";
                }
                else if (data.weather[i].description == "light snow") {
                    weatherImage.src = "images/snow.png";
                }
                // weatherCon.innerHTML = `<h2 >${Math.round(main.temp)} °C</h2>`
            }
            input.value = ""
        } else {
            Swal.fire({
                icon: "error",
                html: `Please Enter Valid Input`,
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
            console.log("enter valid input");
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            html: `This City Name Is Not Valid`,
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
        });
        input.value = ""
        console.log(error );
    }
};
const ShowTime = () => {
    let timer = document.getElementById("timer");
    let time = moment().format("LTS");
    let date = moment().format('LL');
    timer.innerHTML = `<h6 class="clock text-primary text-capitalize f-20">${time} <br/> <span class=" text-primary text-capitalize ">${date}</span></h6>`;
};
setInterval(ShowTime, 1000);
