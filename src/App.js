import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [obj, setObj] = useState({});
  const [local,setLocal]=useState('');
  const [query,setQuery]=useState('gafsa');
 const  handlesubmit=(e)=>{
  e.preventDefault()

  setQuery(local)
 }
  useEffect(() => {
    const options = {
      method: "GET",
      url: `http://api.weatherapi.com/v1/forecast.json?key=a03cf2cabcaa4353971164038230401&q=${query}&days=5&aqi=no&alerts=no`,

      headers: {
        "X-RapidAPI-Key": "8bd9d6c688msh68d31c229fdad4ap11c13ajsn87b83ab7f99a",
        "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
      },
    };

    axios.request(options).then(function(response) {
      console.log(response.data)
      
      setObj(response.data)

      })
      .catch(function (error) {
        console.error(error);

      });
  },[query]);

  return (
    <div classname="App">
      <h2>{obj.location&&obj.location.localtime}</h2>
      <form onSubmit={handlesubmit}>
      <input onChange={(e)=>setLocal(e.target.value)}></input>
      </form>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="weather-card one">
              <div className="top">
                <div className="wrapper">
                  <div className="mynav"></div>
                  <h1 className="heading">{obj.current&&obj.current.condition&&obj.current.condition.text}</h1>
                  <h3 className="location">{obj.location&&obj.location.name}</h3>
                  <p className="temp">
                    <span className="temp-value"></span>
                    <span className="deg">{obj.current&&obj.current.temp_c}</span>
                    <span className="temp-type">C</span>
                  </p>
                </div>
              </div>
              <div className="bottom">
                <div className="wrapper">
                  <ul className="forecast">
{obj.forecast&&obj.forecast.forecastday.map(el=><li className="active">
                 <span style={{color:"blue"}}>  {el.date}:</span> 
                    {el.day.maxtemp_c}C
                      <span className="lnr lnr-sun condition">
                        <span className="temp">
                          <span className="deg"></span>
                          <span className="temp-type"></span>
                        </span>
                      </span>
                    </li>
               )}                    
                   
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
