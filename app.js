const userInput = document.querySelector("#user-input");
const ctaButton = document.querySelector("#cta");
const locationButton = document.querySelector("#btnlocation");
const divInHtml = document.querySelector(".result")
const apiKey = '6ffec033c2cb89b60376f6b6152a497b';

ctaButton.addEventListener("click", function(){
    getWeatherApi();
});

locationButton.addEventListener("click",function(){
    getWeatherApiByLocation();
});

async function getWeatherApi() {
    try {
        /* GET THE USER DATA INFORMATION */
        let dataFromUser = userInput.value;
        /* START FETCH DATA..... */

        const ddata = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + dataFromUser + '&appid=' + process.env.apiKey + '&units=metric')
            /* CONVERT DATA TO JSON AND AFTER WE GET THE OBJECT WITH INFORMATION */

            .then(response => response.json()).then(weatherdata => {

                /* HERE WE CREATED DIV
                WITH A CLASS NAME CONTAINER
                TO STORE THE DATA FROM API
                */
                let weatherdiv = document.createElement('div');
                weatherdiv.classList.add("container");
                divInHtml.style.display = "grid";

                /* H1 TAG FOR CITY NAME */

                const {icon} = weatherdata.weather[0];
                let icons = document.createElement('div');
                icons.classList.add("icons");
                icons.innerHTML = `<img src="icons/${icon}.png">`
                weatherdiv.appendChild(icons);


                let cityName = document.createElement('h1');
                cityName.innerText = ' ' + weatherdata.name + ' ' + weatherdata.sys.country + ' ';
                weatherdiv.appendChild(cityName);

                /* H2 TAG FOR DESCRIPTION WEATHER */

                let description = document.createElement('h2');
                description.classList.add("description");
                description.innerText = '' + weatherdata.weather[0].description;
                weatherdiv.appendChild(description);

                /* H2 TAG FOR TEMPERTURE  */

                let temperature = document.createElement('h2');
                temperature.classList.add("temperature");
                temperature.innerText = ' ' + weatherdata.main.temp + ' °';
                weatherdiv.appendChild(temperature);


                /* H2 TAG FOR PRESSURE  */

                let pressure = document.createElement('h2');
                pressure.classList.add("pressure");
                pressure.innerText = weatherdata.main.pressure + ' Hpa';
                weatherdiv.appendChild(pressure);

                /* H2 TAG FOR humidity  */

                let humidity = document.createElement('h2');
                humidity.classList.add("humidity");
                humidity.innerText = weatherdata.main.humidity + ' %' + ' Humidity ';
                weatherdiv.appendChild(humidity);

                /* BUTTON TO CLOSE ALL THE CONTAINER DIV  */

                let closeBtn = document.createElement("button");
                closeBtn.innerText = 'X';
                closeBtn.classList.add("close-btn");
                weatherdiv.appendChild(closeBtn);
                //when we click in the button the position display will be none 
                closeBtn.addEventListener("click", () => {
                    weatherdiv.remove();
                    divInHtml.style.display = "none";
                    return;

                })

                divInHtml.appendChild(weatherdiv);

            })
    } catch {
        const errorPop = document.createElement("div");
        const text = document.createElement("h3");
        const buttonError = document.createElement("button");
        const imgCloud = document.createElement("div");

        // div for error
        errorPop.classList.add("error-pop");
        text.classList.add("text-error");
        buttonError.classList.add("button-error");
        imgCloud.innerHTML = `<img src="icons/unknown.png">`

        text.innerText = "Opps.. Some Thing Worng!";
        text.style.color = '#ff587b';
        buttonError.innerText = "Try again"

        errorPop.appendChild(text);
        errorPop.appendChild(imgCloud);
        errorPop.appendChild(buttonError);

        divInHtml.appendChild(errorPop);
        buttonError.addEventListener("click", () => {
            errorPop.remove();
            divInHtml.style.display = "none";

            return;

        })

    }
    userInput.value = " ";



}

function getWeatherApiByLocation(){
        navigator.geolocation.getCurrentPosition((position) => {
        let {latitude,longitude} = position.coords;
        // let lon = position.coords.longitude;
        const dataLocation = fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+apiKey)
        .then(response => response.json()).then(locationdata =>{
            const {icon} = locationdata.weather[0];

            const weatherdiv = document.createElement('div');
            weatherdiv.classList.add("container");
            divInHtml.style.display = "grid";

            let icons = document.createElement('div');
            icons.classList.add("icons");
            icons.innerHTML = `<img src="icons/${icon}.png">`
            weatherdiv.appendChild(icons);

            let cityName = document.createElement('h1');
            cityName.innerText = ' ' + locationdata.name + ' ' + locationdata.sys.country + ' ';
            weatherdiv.appendChild(cityName);

            let description = document.createElement('h2');
            description.classList.add("description");
            description.innerText = '' + locationdata.weather[0].description;
            weatherdiv.appendChild(description);

            /* H2 TAG FOR TEMPERTURE  */

            let temperature = document.createElement('h2');
            temperature.classList.add("temperature");
            temperature.innerText = ' ' + locationdata.main.temp + ' °C';
            weatherdiv.appendChild(temperature);


            /* H2 TAG FOR PRESSURE  */

            let pressure = document.createElement('h2');
            pressure.classList.add("pressure");
            pressure.innerText = locationdata.main.pressure + ' Hpa';
            weatherdiv.appendChild(pressure);

            /* H2 TAG FOR humidity  */

            let humidity = document.createElement('h2');
            humidity.classList.add("humidity");
            humidity.innerText = locationdata.main.humidity + ' %' + ' Humidity ';
            weatherdiv.appendChild(humidity);
            divInHtml.append(weatherdiv);

            let closeBtn = document.createElement("button");
            closeBtn.innerText = 'X';
            closeBtn.classList.add("close-btn");
            weatherdiv.appendChild(closeBtn);

            closeBtn.addEventListener("click", () => {

                weatherdiv.remove();
                divInHtml.style.display = "none";
                return;

     });
    });



})};