import React, {useState} from 'react';
import './App.css';
import CitySearch from './CitySearch';
import 'bootstrap/dist/css/bootstrap.min.css'
import AirQualityCard from './AirQualityCard';


function App() {

  const [airQualityData, setAirQualityData] = useState(null)
  const [error, setError] = useState(null)


  const getAirQualityIndex = async (city) => {
  try{
    const response = await fetch (`https://api.waqi.info/feed/${city}/?token=${process.env.REACT_APP_AQI_API_TOKEN}`)
    const data = await response.json()
    console.log(data)

    if (response.ok && data.status === 'ok'){
      setAirQualityData(data.data)
      setError(null)
    }
    else{
      setError("Sorry we couldn't find the city you were looking for. Try another location nearby to ensure your spelling is correct.")
      setAirQualityData(null)
    }
  }
  catch(error){
    console.error('network error:', error)
    setError("Sorry, something went wrong")
    setAirQualityData(null)
  }
}

  return (
    <div class='container'>
      <h1 className='mt-5 mb-3'>Air Quality Index Checker</h1>
      <CitySearch getAirQualityIndex = {getAirQualityIndex}/>
      {/* if there is an error then show a div with error message */}
      {error && (
        <div class='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      {airQualityData && (
        // Air Quality Card Component
        // Pollutant Info
        <>
        <AirQualityCard 
        data = {airQualityData}
        />
        </>
      )}
    </div>
  );
}

export default App;
