const axios = require("axios");
const express = require("express");

const weatherRouter = express.Router();

const WEATHER_URL = "http://api.weatherbit.io/v2.0/current";

weatherRouter.get("/", async (req, res, next) => {
  // req.query.params
  // req.params if we set /:city, the system will have req.params.city
  // req.body
  // req.headers
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ message: "missed lat or lon" });
    }
    const response = await axios(WEATHER_URL, {
      params: {
        key: "53a93319195f4fc7baf1b539979cc10c",
        lat,
        lon,
        // lat: "50.441215",
        // lon: "30.544675",
      },
    });
    res.json({ response: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = weatherRouter;
