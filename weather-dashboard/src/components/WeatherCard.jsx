import { useSettings } from '../context/SettingsContext';

const CODES = {
  0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  80: 'Rain showers', 81: 'Rain showers', 82: 'Violent showers', 95: 'Thunderstorm',
};
export const describe = (code) => CODES[code] || 'Unknown';

export function useTemp() {
  const { unit } = useSettings();
  return (c) => (unit === 'C' ? Math.round(c) : Math.round((c * 9) / 5 + 32)) + '°' + unit;
}

export default function WeatherCard({ city, current, isFavorite, onToggleFavorite }) {
  const temp = useTemp();
  return (
    <section className="current">
      <div>
        <h2>{city.name}{city.country ? `, ${city.country}` : ''}</h2>
        <p className="big">{temp(current.temperature_2m)}</p>
        <p>{describe(current.weather_code)}</p>
      </div>
      <div className="stats">
        <p>Humidity: {current.relative_humidity_2m}%</p>
        <p>Wind: {current.wind_speed_10m} km/h</p>
        <button onClick={onToggleFavorite}>
          {isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        </button>
      </div>
    </section>
  );
}
