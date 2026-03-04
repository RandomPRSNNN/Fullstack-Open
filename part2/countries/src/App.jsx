import { useState, useEffect } from "react"
import countryService from "./services/countries"
import Matches from "./components/Matches";

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryService.getAllCountries().then(allCountries => {
      setAllCountries(allCountries)
    })
  }, [])

  const handleInputChange = (event) => {
    if(event.target.value)
    {
      const matches = allCountries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredCountries(matches)
    }
    else
    {
      setFilteredCountries([])
    }
  }

  return (
    <div>
      <h3>Find countries</h3>
      <input onChange={handleInputChange}></input>
      <Matches countries={filteredCountries}/>
    </div>
  );
};

export default App;