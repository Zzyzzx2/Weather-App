import { useState } from "react";
import Search from "./components/search/search";
import Forecast from "./components/forecast/Forecast";
import { ClassNames } from "@emotion/react";
import { convertLength } from "@mui/material/styles/cssUtils";
import CurrentWeather from "./components/current-weather/currentWeather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import Header from "./Header";
import Footer from "./components/Footer";

function App() {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecastWeather, setForecastWeather] = useState([]);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastWeatherFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <Header />
      <div className="max-w-4xl my-5 mx-auto">
        <Search onSearchChange={handleOnSearchChange} />
      </div>
      <div className="my-5 mx-auto flex items-end justify-center">
        {currentWeather && currentWeather.city && (
          <CurrentWeather data={currentWeather} />
        )}
      </div>
      <div>
        {forecastWeather && forecastWeather.city && (
          <Forecast data={forecastWeather} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
