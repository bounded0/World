import axios from "axios"
import express from "express"
import bodyParser from "body-parser"

let countryNames = []

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.get("/:continentName", async (req,res)=>{
    let {continentName} = req.params
    console.log(continentName + " asa")
    if(continentName.includes("north")){
        continentName = "North America"
    }
    if(continentName.includes("south")){
        continentName = "South America"
    }

    const result = await axios.get("https://restcountries.com/v3.1/all")

    result.data.forEach(country => {
       
        if(country.continents[0] ===`${continentName}`){
            console.log(country.name.common, "=>", country.continents[0]);
            countryNames.push(country.name.common)
         
        }

      });

    if(continentName.includes(continentName,"north")){
     continentName = "north-america"
     console.log( continentName,"sadaad")
    }
    if(continentName.includes(continentName,"south")){
        continentName = "south-america"
        console.log( continentName,"sadaad")
       }
    res.render(`${continentName}.ejs`, { continentName,countryNames});
    countryNames = []

})

app.listen(3000,()=>{
    console.log("Working..")
})