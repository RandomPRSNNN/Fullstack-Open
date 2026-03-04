import axios from "axios"

const getAllCountries = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => response.data)
}

const getWeather = (long, lat) => {
    const request = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`)
    return request.then(response => response.data)
}

export default { getAllCountries, getWeather }