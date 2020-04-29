import React, {useState, useEffect} from 'react';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    const filteredList = countries.filter(country => country.name.toLowerCase().includes(search))
    // We only want to call the api when we already havent received the weather of that country. 
    if (filteredList.length === 1 && !weather[filteredList[0].name]) {
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${filteredList[0].name}`)
      .then(response => {
        const newObject = {}
        newObject[filteredList[0].name] = response.data;
        setWeather({...weather, ...newObject})
      })
    }
  }, [search])

  const handleOnChange = event => {
    setSearch(event.target.value.toLowerCase())
  }

  const handleOnClick = event => {
    setSearch(event.target.value.toLowerCase())
  }

  const renderList = () => {
    const filteredList = countries.filter(country => country.name.toLowerCase().includes(search))

    const renderedList = filteredList.map(country => (
      <div key={country.name}>
        {country.name}
        <button value={country.name} onClick={handleOnClick}>show</button>
      </div>
    ))

    if (filteredList.length > 10) {
      return (
        <div>Too Many matches, specify another filter</div>
      )
    } else if (filteredList.length === 1) {
      return (
        <div>
          <h1>{filteredList[0].name}</h1>
          <div>capital {filteredList[0].capital}</div>
          <div>population {filteredList[0].population}</div>
          <h2>languages</h2>
          <ul>
            {filteredList[0].languages.map(({name}) => <li key={name}>{name}</li>)}
          </ul>
          <img src={filteredList[0].flag} alt={`flag of ${filteredList[0].name}`} style={{height: '150px', width: '150px'}}/>
          { weather[filteredList[0].name] ? (
            <>
              <h2>Weather in {weather[filteredList[0].name].location.name}</h2>
              <div><b>temperature</b> {weather[filteredList[0].name].current.temperature} Celcius</div>
              <img src={weather[filteredList[0].name].current.weather_icons[0]} alt={'weather icon'}/>
              <div><b>wind</b> {weather[filteredList[0].name].current.wind_speed} mph direction {weather[filteredList[0].name].current.wind_dir}</div>
            </>
            )
          : null
          }
        </div>
      )
    } 
    return renderedList
  }

  return (
    <div className="App">
    find countries <input value={search} onChange={handleOnChange}/>
    <div>{renderList()}</div>
    </div>
  );
}

export default App;
