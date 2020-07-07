const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const api_key = process.env.API_KEY;
app.use(express.static(__dirname + "/public"));

app.get("/photo/:query&:category", async (request, response) => {
  let params = request.params;
  const string = `https://pixabay.com/api/?key=${api_key}&category=${params.category}&q=${params.query}`;
  let data = await fetch(string);

  const responseData = await data.json();

  response.send(responseData);
});

app.get("/id/:id", async (request, response) => {
  let params = request.params;
  const string = `https://pixabay.com/api/?key=${api_key}&id=${params.id}`;
  let data = await fetch(string);

  const responseData = await data.json();

  response.send(responseData);
});

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
