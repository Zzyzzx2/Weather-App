export const GEO_API_URL =
  "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions";
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6d0a880f66msh46c1b53e886df68p183197jsncd9a7f7407fa",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

try {
  const response = await fetch(GEO_API_URL, geoApiOptions);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "79020986264a87281f44d8be82df41a3";
