 const apikey = "0e6ca8bba721fe91d1163e3da072441c";
const card = document.querySelector(".card");
const locationDisplay = document.querySelector(".city");
const tempdisplay = document.querySelector(".temp");
const humiditydisplay = document.querySelector(".humidity span");
const VisibilityDisplay = document.querySelector(".Visibility span");
const feels_like = document.querySelector(".feels_like span");
const windspeedDisplay = document.querySelector(".windspeed span");
const sunriseDisplay = document.querySelector(".sunrise span");
const sunsetDisplay = document.querySelector(".sunset span");
const descriptiondisplay = document.querySelector(".sky");
const emojidisplay = document.querySelector(".weatheremoji");
const inputCity = document.querySelector(".input");
const displayerror = document.querySelector(".eror");
const c = document.querySelector(".c");
const f = document.querySelector(".f");

let curentunit = "c";
let dataAll;
let lon;
let lat;

 fetchingdata("islamabad");


c.addEventListener("click", () => {
  curentunit = "c";
  updatetmp(dataAll);
});


f.addEventListener("click", (even) => {
  curentunit = "f";
  updatetmp(dataAll);
});


addEventListener("submit", (event) => {
  event.preventDefault();
  displayerror.classList.add("d-none");
  city = inputCity.value;
  //   debugger
  // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`).then(response=> response.json()).then(data=>{
  //  lon= data.coord.lon;
  //  lat= data.coord.lat;
  //  console.log(lon,lat)
  // }).catch(error => console.log(error));
  //  fetchingdata(lat,lon);

   fetchingdata(city);
});


// async function fetchingdata(lat,lon) {
async function fetchingdata(city) {
  //    debugger
  if (city) {
    try {
      // const weatherdata = await getweatherdata(lat,lon);
      const weatherdata = await getweatherdata(city);
      displaydata(weatherdata);
    } catch (eror) {
      console.log("error catch:" + eror);
      errordisplay("could not fetch data try again");
    }
  } else {
    console.log("please enter a city name");
    errordisplay("please enter a city name");
  }
}


// async function getweatherdata(lat,lon) {

async function getweatherdata(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  //  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apikey}`;
  

  const response = await fetch(apiUrl);

  if (!response.ok) {
    console.log("could not fetch data try again");
    errordisplay("could not fetch data try again");
  }
  return response.json();
}


function displaydata(data) {
  console.log(data);

  dataAll = data;
  locationDisplay.textContent = data.name + ", " + data.sys.country;
  updatetmp(data);
  VisibilityDisplay.textContent = `${data.visibility / 1000}`;
  humiditydisplay.textContent = data.main.humidity;
  windspeedDisplay.textContent = data.wind.speed;
  descriptiondisplay.textContent = data.weather[0].description;
  const icon = data.weather[0].icon;
  emojidisplay.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  sunriseDisplay.textContent = convertUnixTo12Hour(data.sys.sunrise);
  sunsetDisplay.textContent = convertUnixTo12Hour(data.sys.sunset);
}


function updatetmp(data) {
  if (curentunit === "c") {
    tempdisplay.textContent = `${(data.main.temp - 273.15).toFixed(1)}°`;
    feels_like.textContent = `${(data.main.feels_like - 273.15).toFixed(1)}°C`;
    f.classList.replace("active", "disable");
    c.classList.replace("disable", "active");
  } else {
    tempdisplay.textContent = `${(
      ((data.main.temp - 273.15) * 9) / 5 +
      32
    ).toFixed(1)}°`;
    feels_like.textContent = `${(
      ((data.main.feels_like - 273.15) * 9) / 5 +
      32
    ).toFixed(1)}°F`;
    c.classList.replace("active", "disable");
    f.classList.replace("disable", "active");
  }
}


function errordisplay(message) {
  displayerror.textContent = message;
  displayerror.classList.replace("d-none", "showeror");
  // card.textContent = "";
  // card.append(msg);
}


function convertUnixTo12Hour(unixTime) {
  const date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let period = hours >= 12 ? "AM" : "PM";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return `${hours}:${minutes}:${seconds} ${period}`;
}


