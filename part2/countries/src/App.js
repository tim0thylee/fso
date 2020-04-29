import React, {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then(response => setCountries(response.data))
  }, [])

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
