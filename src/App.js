import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from "@mui/material";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { prettyPrintStat, sortData } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css"
import "./InfoBox.css"

function App() {
  const [countries, setCountries] = useState([])
  const [country, setcountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.086, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      })


  }, [])


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2

            }

          ))
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);

        })
    }

    getCountriesData();
  }, []);
  console.log(casesType);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log(countryCode);

    const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setcountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4);
      })
  }

  // console.log("countryInfo", countryInfo)


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker by Tanishk</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
              {/* <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem> */}

            </Select>
          </FormControl>
        </div>



        <div className="app__stats">
          <InfoBox color="yellow" isRed active={casesType === "cases"} onClick={e => setCasesType('cases')} cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} title="Coronavirus Cases" />
          <InfoBox active={casesType === "recovered"} onClick={e => setCasesType('recovered')} cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} title="Recovered" />
          <InfoBox isRed active={casesType === "deaths"} onClick={e => setCasesType('deaths')} cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} title="Deaths" />
        </div>
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          <h3 className='app__graphTitle'>Worldwide {casesType} line graph</h3>
          <LineGraph
            className="app__graph"
            casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
