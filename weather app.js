


let input = document.querySelector(".city-input")
let searchBtn = document.querySelector(".search-btn")
if( input.value != "" || input.value != null ){
    searchBtn.addEventListener("click",function(){
    let cityName = input.value
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=44e3a58014ada440483ed460f8644c42&units=metric`
    axios.get(url).then((response)=>{
    let weather = response.data
    // Set the Value in the Page
     let cityName = document.querySelector(".city").innerHTML = weather.name
    let temp= document.querySelector(".temp").innerHTML = weather.main.temp
    let tempFeelsLike = document.querySelector(".feels-like").innerHTML = weather.main.feels_like
     let humidity = document.querySelector(".humidity-deg").innerHTML = weather.main.humidity
    let windspeend = document.querySelector(".windspeend").innerHTML = weather.wind.speed
        // Set the Icons in The Page
        if(weather.weather[0].description == "broken clouds"){
            document.querySelector("#icon").className = "bi bi-cloud-sun fs-2 "
        }else if(weather.weather[0].description == "scattered clouds"){
            document.querySelector("#icon").className = "bi bi-cloud-sun-fill fs-2 "
        }else if(weather.weather[0].description == "sun"){
            document.querySelector("#icon").className = "bi bi-sun-fill fs-2 "
        }
        // set the Weather Object 
                const obj = {
            cityName,
            temp,
            tempFeelsLike,
            humidity,
            windspeend,
            }
            
             localStorage.setItem(`weather`,JSON.stringify(obj))
           
            weatherSearch()
            
    }).catch((error)=>{
        // Get a reference to the error alert
        const errorAlert = document.getElementById("error-alert");
        // Add an event listener to the window object to listen for errors
        if(error){
             errorAlert.classList.remove("d-none");
             errorAlert.innerHTML = error.response.data.message 
             errorAlert .innerHTML += `  <i class="bi bi-x-lg  close-alert"></i>`
        }
        // Add an event listener to the error alert to hide it when the user clicks the close button
        errorAlert.addEventListener("click", event => {
            errorAlert.classList.add("d-none");
        });    
    })
 })
}

//  Alert  
 
function weatherSearch  (){
    if(localStorage != null){
        let weather = JSON.parse(localStorage.getItem("weather"))
        let content = `<div class="fs-4 text-light p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end"> The Temprature Today in ${weather.cityName}
                         ${weather.temp} but it Feels Like ${weather.tempFeelsLike} </div>`
                        
                    document.querySelector(".weather-today").innerHTML = content  
    }localStorage.removeItem("weather")
}