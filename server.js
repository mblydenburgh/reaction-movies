const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const db = require("./models/index.js");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/movies"
mongoose.connect(MONGODB_URI, { useNewUrlParser:true });
mongoose.set("useFindAndModify",false)

// Define API routes here
require('./routes/api-routes.js')(app);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

async function startServer(){
  return app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });

}

startServer();