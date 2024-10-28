import axios from "axios";
import express from "express";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

let countryName = [];

app.get("/:continentName", async (req, res) => {
  let { continentName } = req.params;
  const formattedName = formattedContinentName(continentName);
  const viewName = formattedName.toLowerCase().replace(" ", "-");
  const result = await axios.get("https://restcountries.com/v3.1/all");

  const countryNames = result.data
    .filter((country) => country.continents[0] === formattedName)
    .map((country) => ({name : country.name.common, capital : country.capital, flag : country.flags.png}));
  res.render(`${viewName}.ejs`, { continentName: formattedName, countryNames });
  countryName = [];
});


function formattedContinentName(name) {
  const normalized = name.toLowerCase();
  if (normalized.includes("north")) return "North America";
  if (normalized.includes("south")) return "South America";
  return name;
}

app.listen(3000, () => {
  console.log("Working..");
});
