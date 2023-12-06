import './App.css';
import axios from "axios";
import {useState} from "react";
import worldMap from './assets/world_map.png'
import regionColor from "./helpers/regionColor.js";


// endpoint for all https://restcountries.com/v3.1/all

function App() {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');

    async function fetchCountries() {
        setError('')
        try {
            const result = await
                axios.get('https://restcountries.com/v3.1/all');
            console.log(result.data[0]);
            setCountries(result.data);

        } catch (e) {
            console.error(e);
            setError('Het ophalen van de data is mislukt. Probeer het opnieuw');
        }
    }




    return (
        <>
            <main>
                <section>
                <header>
                    <div className="worldMap-container">
                        <img src={worldMap} alt=""/>
                    </div>
                </header>
                <h1>World Regions</h1>


                    <article>
                        <div className="btn-wrapper">
                        {error && <p className="error">{error}</p>}
                        <button type="button" onClick={fetchCountries}>click me</button>
                        </div>
                    </article>
                    <article className="countries-wrapper">
                        {countries.map((country, index) => (
                            <ul>
                                <li key={country.name?.common}>
                                    <div className="country-container">
                                        <div className="flag-wrapper">
                                            <img src={country.flags?.svg} alt="country flag"/>
                                        </div>
                                        <div className="country-info">
                                            <span className={regionColor(country.region)}>{country.name?.official}</span>
                                            <p>Region: {country.region}</p>
                                            <p>Has a population of {country.population} people</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        ))}
                    </article>
                </section>
            </main>
        </>
    )
}

export default App
