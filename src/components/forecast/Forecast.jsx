import { Accordion, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, 7).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <label className="text-2xl ml-[220px]"> Daily Forecast</label>
      {data.list.slice(0, 7).map((item, idx) => {
        return (
          <Accordion
            expanded={expanded === `panel${idx}`}
            onChange={handleChange(`panel${idx}`)}
            sx={{
              maxWidth: "1000px",
              margin: "0px auto",
              backgroundColor: "#1A5FA3",
              //   #4968A7
              color: "white",
              borderRadius: "5px",
            }}
            disableGutters={true}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${idx}bh-content`}
              id={`panel${idx}bh-header`}
            >
              <Typography sx={{ width: "10%", flexShrink: 0 }}>
                <img
                  alt="weather"
                  src={`icons/${item.weather[0].icon}.png`}
                  className="w-[40x] h-[40px]"
                />
              </Typography>
              <Typography
                sx={{ width: "25%", flexShrink: 0, alignSelf: "center" }}
              >
                {forecastDays[idx]}
              </Typography>
              <Typography
                sx={{
                  width: "50%",
                  flexShrink: 0,
                  fontSize: "20px",
                  alignSelf: "center",
                }}
              >
                {capitalizeWords(item.weather[0].description)}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignSelf: "center",
                }}
              >
                {Math.round(item.main.temp_min)}ºC {"/"}
                {Math.round(item.main.temp_max)}ºC
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                maxWidth: "1000px",
                margin: "1px 1px",
                backgroundColor: "#4968A7",
                color: "white",
              }}
            >
              <Grid container spacing={2}>
                {/* First row */}
                <Grid item xs={3}>
                  <Typography align="start">Pressure:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="end">{item.main.pressure} hPa</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="start">Humidity:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="end">{item.main.humidity}%</Typography>
                </Grid>

                {/* Second row */}
                <Grid item xs={3}>
                  <Typography align="start">Feels Like Temp:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="end">
                    {Math.round(item.main.feels_like)}°C
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="start">Wind Speed:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="end">{item.wind.speed}m/s</Typography>
                </Grid>
                {/* Third row */}
                <Grid item xs={3}>
                  <Typography align="start">Sea Level:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="end">{item.main.sea_level}m</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="start">Cloudiness: </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="end">{item.clouds.all}%</Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default Forecast;
