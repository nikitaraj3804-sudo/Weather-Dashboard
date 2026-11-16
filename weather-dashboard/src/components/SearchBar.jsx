import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState(''); // controlled input
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const debounced = useDebounce(query, 500);

  useEffect(() => {
    if (debounced.trim().length < 2) {
      setResults([]);
      return;
    }
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(debounced)}&count=5`)
      .then((res) => {
        if (!res.ok) throw new Error('Search failed. Try again.');
        return res.json();
      })
      .then((data) => {
        setResults(data.results || []);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, [debounced]);

  const pick = (city) => {
    onSelect({ name: city.name, country: city.country, latitude: city.latitude, longitude: city.longitude });
    setQuery('');
    setResults([]);
  };

  return (
    <div className="search">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city"
        aria-label="Search for a city"
      />
      {error && <p className="error">{error}</p>}
      {results.length > 0 && (
        <ul className="suggestions">
          {results.map((c) => (
            <li key={c.id}>
              <button onClick={() => pick(c)}>
                {c.name}{c.admin1 ? `, ${c.admin1}` : ''}, {c.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
