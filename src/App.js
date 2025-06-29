import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [value, setValue] = useState("");
  const [city, setCity] = useState([]);
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = () => {
    if(!value.trim()) return;
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=4cb09fbd67894756985155321252806&q=${value}`)
    .then((response) => response.json())
    .then((data) => {
        if(data.error){
          throw new Error("error");
        }
        setShowData(true);
        setCity(data);

    })
    .catch((error) => {
      setShowData(false);
      console.log(error);
      alert("Failed to fetch weather data");
    })
    .finally(() =>{
      setLoading(false);
    })
  }
  console.log(city);
  // console.log(city);
  

  return (
    <div className="App">
      <input type='text' onChange={(e) => setValue(e.target.value)}></input>
      <button onClick={handleSearch}>Search</button>

      {loading? (
        <p>Loading data...</p>
      ) : (
        showData && (
          
          <div className='weather-cards'>
            <div className='weather-card'>
              <h4>Temperature</h4>
              <p>{city.current.temp_c}⁰C</p>
            </div>
            <div className='card'>
              <h4>Humidity</h4>
              <p>{city.current.humidity}%</p>
            </div>
            <div className='card'>
              <h4>Condition</h4>
              <p>{city.current.condition.text}</p>
            </div>
            <div className='card'>
              <h4>Wind Speed</h4>
              <p>{city.current.wind_kph}kph</p>
            </div>
          </div>

        )
      )}


    </div>
  );
}

export default App;


// temperature humidity condition wind speed