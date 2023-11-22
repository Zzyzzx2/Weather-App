import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(`${GEO_API_URL}?namePrefix=${inputValue}`, geoApiOptions)
      .then((response) => {
        return response.json();
        console.log(response.json());
      })
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              label: `${city.name},${city.country}`,
              value: `${city.latitude} ${city.longitude}`,
            };
          }),
        };
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    setSearch(e);
    onSearchChange(e); //function from the Parent
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#0D1C33",
      borderRadius: "5px",
      border: "2px solid #3B3737",
      boxShadow: state.isFocused ? "0 0 0 2px #000000" : "black",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#3699FF" : "#0B1A1F",
      color: state.isFocused ? "black" : "white",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "white", // Set the text color for the input
    }),
    loadingMessage: (provided) => ({
      ...provided,
      color: "white", // Set the text color for the loading message
      backgroundColor: "#0B1A1F",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "black", // Set the background color for the dropdown menu
    }),
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
        styles={customStyles}
      />
    </div>
  );
};

export default Search;
