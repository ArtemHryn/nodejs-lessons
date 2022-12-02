const axios = require("axios");

const WEATHER_URL = "http://api.weatherbit.io/v2.0/current";


(async () => {
    try {
      const options = {
        params: {
          key: "53a93319195f4fc7baf1b539979cc10c",
          lat: "50.441215",
          lon: "30.544675",
        },
        };
    const response = await axios(WEATHER_URL, options);
        console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
