const app = require("./src/app");
require("dotenv").config();
const { connectMongo } = require("./src/db/connection");


const PORT = process.env.PORT || 3001;


const startServer = async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });

  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
}

startServer()
