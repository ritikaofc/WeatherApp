import hotBg from './assets/hot.jpg';
import coldBg from './assets/cold.jpg';
import Descriptions from './components/Descriptions';

import {getFormattedWeatherData} from "./weatherService";
import { useEffect, useState } from "react";
import {FaGithub} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';

 
function App() {

  const  [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('imperial'); // metric or imperial
  const [city, setCity] = useState('Pune');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bg, setBg] = useState(hotBg);
  

  useEffect(() => {
    
    const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city,units);

    setWeather(data);
     
    
    //dynamic Background Image
      
    const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);

      //dynamic  description according to temperature
      
      const desc = document.querySelector(".description");
      if (data.temp <= threshold)


        desc.innerHTML = "Embrace the chill, wrap up tight!";
      else 
        desc.innerHTML = "Bask in the sunny vibes! Have a great day!";
        
     

      

    };
    fetchWeatherData();
  }, [units, city]);


  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }


  };
  
  
  
  
    return (
    <div className="app" style={{backgroundImage:`url(${bg})`}} >
     

     <div className="overlay">
      {
        weather && ( 
          <div className="container">
          <div className="section section__inputs">
            
            
            <input onKeyDown = {enterKeyPressed} type="text" placeholder="Enter City....." />
            <button onClick = {(e) => handleUnitsClick(e)}>°C</button>
          
            </div>

            <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="icon" />
              
              <h3>{weather.description}</h3>
              </div>


              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${units=== 'metric' ? "C" : "F"}`}</h1> 
                
                
            
                <h3 className="description"></h3>
              </div> 
              
              
             
          </div>

          <Descriptions  weather={weather} units={units}/>  

          
       </div>


        )

      }
          
     </div>
     
      </div>
   ); 
}

export default App;
