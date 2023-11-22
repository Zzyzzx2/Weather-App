import React from "react";
import { TiWeatherSunny, TiWeatherWindy } from "react-icons/ti";
import { IoWater } from "react-icons/io5";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import { BsFillCloudsFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
const CurrentWeather = ({ data }) => {
  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className="my-5 bg-gray-600 w-[450px] shadow-xl rounded-lg grid grid-rows-2 grid-cols-2 ">
      <div className="flex justify-center">
        <img
          alt="weather"
          src={`icons/${data.weather[0].icon}.png`}
          className="w-25 h-25"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-7xl font-medium text-sky-500/70 font-mono">
          {Math.round(data.main.temp)}ºC
        </h1>
      </div>
      <div className="flex flex-col ml-2 items-start justify-center">
        <div className="flex space-x-1">
          <IconContext.Provider value={{ color: "gray", size: "2em" }}>
            <BsFillCloudsFill />
          </IconContext.Provider>
          <p className="text-base"> {data.clouds.all}% </p>
        </div>
        <div className="flex space-x-1">
          <IconContext.Provider value={{ color: "#54C2E8", size: "2em" }}>
            <TiWeatherWindy />
          </IconContext.Provider>
          <p className="text-base"> {data.wind.speed} m/s </p>
        </div>
        <div className="flex space-x-1">
          <IconContext.Provider value={{ color: "#6593F6", size: "2em" }}>
            <WiHumidity />
          </IconContext.Provider>
          <p className="text-base"> {data.main.humidity}% </p>
        </div>
        <div className="flex space-x-1">
          <IconContext.Provider value={{ color: "#E8545C", size: "2em" }}>
            <WiBarometer />
          </IconContext.Provider>
          <p className="text-base"> {data.main.pressure} hPa </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="font-semibold text-[36px] leading-[40px] text-lime-50/90">
          {capitalizeWords(data.weather[0].description)}
        </p>
        <p className="font-medium text-1xl text-black/30">{data.city}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
