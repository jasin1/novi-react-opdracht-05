import './App.css';
import axios from "axios";
import {useState} from "react";
import worldMap from './assets/world_map.png'
import regionColor from "./helpers/regionColor.js";
import calcPop from "./helpers/calcPopulation.js";
import searchPic from './assets/search-graphic.jpg';


// endpoint for all https://restcountries.com/v3.1/all

function App() {
    const [countries, setCountries] = useState([]);
    const [searching, setSearching] = useState([]);
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const [formState, setFormState] = useState('');

    async function fetchCountries() {
        setError('')
        try {
            const result = await
                axios.get('https://restcountries.com/v3.1/all');
            console.log(result.data);
            // Data wordt gesorteerd op population van hoog naar laag
            setCountries(result.data.sort((a, b) => b.population - a.population));

        } catch (e) {
            console.error(e);
            setError('Het ophalen van de data is mislukt. Probeer het opnieuw');
        }
    }

    // let land = 'nederland';

    async function findCountries() {
        setError2('')
        try {
            const found = await
                axios.get(`https://restcountries.com/v3.1/name/${formState}?fullText=true`);
            console.log(found.data);
            setSearching(found.data);


        } catch (event) {
            console.error(event);
            setError2(`${formState} bestaat niet. Probeer het opnieuw`)
        }
    }

    function handleChange(event) {
        setFormState(event.target.value);

    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Form Data:', formState);
        findCountries();
    }

    const countryName = searching.length > 0 ? searching[0].name.common : ' ';
    const countryCapital = searching.length > 0 ? searching[0].capital : ' ';
    const countryFlag = searching.length > 0 ? searching[0].flags : ' ';
    const countryPopulation = searching.length > 0 ? searching[0].population : ' ';
    const countryRegion = searching.length > 0 ? searching[0].region : ' ';
    const countryBorders = searching.length > 0 ? searching[0].borders.join(', ') : ' ';

    // {calcPop(countryPopulation)}


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
                            <button type="button" onClick={fetchCountries}>Fetch Countries</button>
                        </div>
                    </article>
                    {countries.length > 0 && (
                        <article className="countries-wrapper">
                            {countries.map((country, index) => (
                                // <ul key={country.name?.common}>
                                <ul key={index}>
                                    <li>
                                        <div className="country-container">
                                            <div className="flag-wrapper">
                                                <img src={country.flags?.svg} alt="country flag"/>
                                            </div>
                                            <div className="country-info">
                                            <span
                                                className={regionColor(country.region)}>{country.name?.official}</span>
                                                <p>Region: {country.region}</p>
                                                <p>Has a population of {calcPop(country.population)} people</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </article>
                    )}

                    <article className="search-wrapper">
                        <div className="pic-container">
                            <img src={searchPic} alt="search graphic"/>
                        </div>

                        {/*<button type="button" onClick={findCountries}>find Countries</button>*/}
                        <div className="form-wrapper">
                            <form onSubmit={handleSubmit}>
                                <div className="search-container">
                                    <label htmlFor="">
                                        <input
                                            type="search"
                                            value={formState}
                                            onChange={handleChange}
                                            placeholder="Search for a country by name"

                                        />
                                    </label>
                                    <button className="search-btn" type="submit">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                        {error2 && <p className="error">{error2}</p>}
                        {searching.length > 0 &&
                            <div className="search-result-card">

                                <div className="card-header">
                                    <div className="flag-wrapper">
                                        <img src={countryFlag.png} alt="country flag"/>

                                    </div>

                                    {/*<h2 className="card-title">Nederland</h2>*/}
                                    <h2>
                                        {countryName}
                                    </h2>

                                </div>

                                <div className="card-body">
                                    <p className="card-txt">
                                        {countryName} is situated in {countryRegion} and the capital is {countryCapital}.
                                        It has a population of {calcPop(countryPopulation)} people and it
                                        borders with {countryBorders}&nbsp;neighboring countries
                                    </p>
                                </div>

                            </div>
                        }
                    </article>
                </section>
            </main>
        </>
    )
}

export default App
