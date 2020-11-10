import React,{useState,useEffect} from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core"
import InfoBox from './infoBox.js';

function App() {
  const[countries,setCountries]=useState(['A','B','C']);
  const[country,setCountry]=useState('worldwide');

  useEffect(() => {
    const getCountriesData=async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries=data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }

        ));
        setCountries(countries);
      });
    };
    getCountriesData();
  }, [])

  const onCountryChange=(event)=>{
    const countryCode=event.target.value;
    setCountry(countryCode)

  };

  return (
    <div className="App">
      <div className="app__header">
        
      <h1>Covid 19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select
         variant="outlined" onChange={onCountryChange} value={country}
         >
          <MenuItem value="worldwide">Worldwide</MenuItem>
           {
             countries.map(country=>(
               <MenuItem value={country.value}>{country.name}</MenuItem>
             ))
           }

           {/**
           <MenuItem value="worldwide">Worldwide</MenuItem>
           <MenuItem value="worldwide">hello</MenuItem>
           <MenuItem value="worldwide">what</MenuItem>
           <MenuItem value="worldwide">love</MenuItem>
           <MenuItem value="worldwide">fools</MenuItem>
           */}

         </Select>
      </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
        <InfoBox title="Recovered" cases={123} total={3000}/>
        <InfoBox title="Deaths" cases={123} total={4000}/>
          
      </div>


   </div>
  );
}

export default App;

