import React,{useState,useEffect} from 'react';
import LineGraph from "./LineGraph"
import sortData from './util.js'
import Table from './Table.js'
import Map from './Map.js'
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core"
import InfoBox from './infoBox.js';

function App() {
  const[country,setCountry]=useState('worldwide');
  const[countries,setCountries]=useState([]);
  const[countryInfo,setCountryInfo]=useState({});
  const[tableData,setTableData]=useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  },[])

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
        const sortedData = sortData(data);
        /*setTableData(data);*/
        setTableData(sortedData);
        setCountries(countries);
      });
    };
    getCountriesData();
  }, [])

  const onCountryChange=async(event)=>{
    const countryCode=event.target.value;
    setCountry(countryCode);

    const url=countryCode==='worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountry(countryCode)
      setCountryInfo(data);


    })
  };
  console.log('COUNTRY INFO >>>',countryInfo)

  return (
    <div className="App">
      <div className="app__left">


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
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          
      </div>
      
      <Map />
      </div>

      <Card className="div.app__right">
        <CardContent>
          <h2>Live cases by country</h2>
          <Table countries={tableData} />
          <h2>Worldwide new cases</h2>
          <LineGraph />
        </CardContent>


      </Card>


   </div>
  );
}

export default App;

