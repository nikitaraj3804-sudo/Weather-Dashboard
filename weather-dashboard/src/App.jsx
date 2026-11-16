import { useState, useEffect } from 'react';
import { useSettings } from './context/SettingsContext';
import useLocalStorage from './hooks/useLocalStorage';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import Favorites from './components/Favorites';

const DEFAULT_CITY = { name: 'Agartala', country: 'India', latitude: 23.84, longitude: 91.28 };
const sameCity = (a, b) => a.latitude === b.latitude && a.longitude === b.longitude;

export default function App() {
  const { unit, setUnit, dark, setDark } = useSettings();
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('wd-favorites', []);

  // Fetch weather whenever the selected city changes.
  useEffect(() => {
    setLoading(true);
    setError(null);
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load weather. Check your connection and try again.');
        return res.json();
      })
      .then(setWeather)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  const isFavorite = favorites.some((f) => sameCity(f, city));
  const toggleFavorite = () =>
    setFavorites(isFavorite ? favorites.filter((f) => !sameCity(f, city)) : [...favorites, city]);
  const removeFavorite = (c) => setFavorites(favorites.filter((f) => !sameCity(f, c)));

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header>
        <h1>Weather Dashboard</h1>
        <div className="toggles">
          <button onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}>Show °{unit === 'C' ? 'F' : 'C'}</button>
          <button onClick={() => setDark(!dark)}>{dark ? 'Light mode' : 'Dark mode'}</button>
        </div>
      </header>

      <SearchBar onSelect={setCity} />

      <main>
        {loading && <p className="muted">Loading weather...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && weather && (
          <>
            <WeatherCard
              city={city}
              current={weather.current}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
            <h2>Next 5 days</h2>
            <ForecastList daily={weather.daily} />
          </>
        )}
        <h2>Favorites</h2>
        <Favorites favorites={favorites} onSelect={setCity} onRemove={removeFavorite} />
      </main>
    </div>
  );
}
