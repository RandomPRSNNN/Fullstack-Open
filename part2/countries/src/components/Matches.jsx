import Country from "./Country"

const Matches = ({ countries }) => {
    const numberOfCountries = Object.keys(countries).length;

    if (numberOfCountries > 10) {
        return 'Too many matches, please be more specific'
    }
    else if (numberOfCountries === 1) {
        return (
            <div>
                <Country country={countries[0]}/>
            </div>
        )
    }
    else {
        return (
            <div>
                {countries.map(country => (
                    <div key={country.cca2}>
                        {country.name.common}
                        <button onClick={() => showOnMaps(country.maps.googleMaps)}>Map</button>
                    </div>
                ))}
            </div>
        )
    }
}

const showOnMaps = (link) => {
    window.open(link, '_blank');
}

export default Matches