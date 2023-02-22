import { useState, useEffect } from "react";
import "../css/home.css";
import SearchBar from "./SearchBar";
import { CurrentWeather, findIcon } from "./CurrentWeather";
import TempChart from "./TempChart";
import Forecast from "./Forecast";
import Footer from "./Footer";
import ExtraData from "./ExtraData";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faCloud } from '@fortawesome/free-solid-svg-icons';
import cloudImg from "../assets/cloud.jpg";
import nightImg from "../assets/night.jpg";
import { getWeather } from "../api";

function Home() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [currentData , setCurrentData] = useState(null);
  const [extraData , setExtraData] = useState(null);
  const [forecastDays , setForecastDays] = useState(null);
  // const [isDay, setIsDay] = useState(true);

  // Change the background image when the toggle state changes
  useEffect(() => {
   document.body.style = `background-image:  linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(${toggle ? cloudImg : nightImg});`
  }, [toggle]);

  // Check if time is day or night
  useEffect(() => {
    const hour = new Date().getHours();
    const isDay = hour >=6 && hour < 18; 
    setToggle(isDay);
  }, []);

  // import the API key from .env file
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY 
  // || '82df8619efcadbf831c2cf2db1a19678';

  // Get user's location using the Geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position ',position)
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (err) => console.log(err)
    );
  }, []);

  const loadDataFromApi = async () => {
      const apidata = await getWeather(lat ,lon);
      console.log('apidata ',apidata)
      setWeather(apidata);
      
  // Store the current weather data in an object
    const curr = {
      temp: apidata?.data[0].temp,
      location: apidata?.city_name,
      date: apidata?.data[0].valid_date,
      icon: apidata?.data[0].weather.icon,
      text: apidata?.data[0].weather.description,
    };  
    setCurrentData(curr);

    
  // Store the extra weather data in an object
  const extra = {
    pressure: apidata?.data[0].pres,
    wind: apidata?.data[0].wind_spd,
  };

  setExtraData(extra);

  const forecasts = [];
  
  for (let i = 0; i < 7; i++) {
    // const element = array[i];
    forecasts.push(weather.data[i]);
  }

  setForecastDays(forecasts)
  }

  // Fetch weather data from the weather API using latitude and longitude
  useEffect(() => {
    if(lat && lon){
      loadDataFromApi();
      }
  }, [lat , lon]);

  // Fetch weather data from the weather API using location from the search bar
  useEffect(() => {
    if(location !== ''){

      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=yes`
        )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
  }, [location]);



  // Store the forecast data in an array

  // Store the hourly temperature data in an array
  const temps = [];
weather?.data?.forEach((item) => {
  temps.push(item.temp);
});


  // Filter the hourly temperature data to get the temperature every 3 hours
  const eightTemps = temps.filter((_, i) => i % 3 === 0);

  // Add the last temperature to the array
  const nineTemps = [...eightTemps, temps[temps.length - 1]];

  // Convert the date to words
  const dateToWords = (date) => {
    if (!date) {
      return '';
    }
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    date = new Date(date);
    const month = months[date.getMonth()];
    const dateNum = date.getDate();

    return `${month} ${dateNum}`;
  };

  return (
    <div className="App">
      <nav className="nav">
        <div className="logo">
          <FontAwesomeIcon
            icon={faCloud}
            className="logo__icon"
          />
          <h1 className="logo__text">Weather App</h1>
        </div>
        <SearchBar setCity={setLocation} toggle={toggle} />
        <FontAwesomeIcon
          icon={faCircleHalfStroke}
          className="switch-mode"
          onClick={() => {
            setToggle(!toggle);
          }}
          style={{
            transform: toggle ? "scaleX(1)" : "scaleX(-1)",
          }}
        />
      </nav>
      <div className="grid-two">
        <div className="grid-one">
          <CurrentWeather weatherData={currentData} />
          <div className="grid-three">
            {forecastDays?.map((day ,i) =>{
              console.log('day ',day);
              return(
                <Forecast
                key={i}
                  date={dateToWords(day.datetime)}
                  icon={findIcon(day.weather.icon)}
                  value={day.dewpt}
                />
              )})}
          </div>
          <div className="grid-three">
            <ExtraData extraData={extraData} />
          </div>
        </div>
        <div className="grid-four">
          <TempChart tempsData={nineTemps} />
          <Footer />
        </div>
      </div>
      {/* <pre>{JSON.stringify(weather, null, 2)}</pre> */}
    </div>
  );
}

export default Home;
