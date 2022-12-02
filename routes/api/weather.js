const axios = require("axios");
const express = require("express");

const weatherRouter = express.Router();

const WEATHER_URL = "http://api.weatherbit.io/v2.0/current";

weatherRouter.get("/", async (req, res, next) => {
  // req.query
  // req.params
  // req.body
  // req.headers
  try {
    const response = await axios(WEATHER_URL, {
      params: {
        key: "53a93319195f4fc7baf1b539979cc10c",
        lat: "50.441215",
        lon: "30.544675",
      },
    });
    res.json({ response: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = weatherRouter;
