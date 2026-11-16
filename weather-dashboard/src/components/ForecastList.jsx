import { describe, useTemp } from './WeatherCard';

export default function ForecastList({ daily }) {
  const temp = useTemp();
  return (
    <section className="forecast">
      {daily.time.slice(0, 5).map((date, i) => (
        <div className="day" key={date}>
          <h3>{new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}</h3>
          <p>{describe(daily.weather_code[i])}</p>
          <p>{temp(daily.temperature_2m_max[i])} / {temp(daily.temperature_2m_min[i])}</p>
        </div>
      ))}
    </section>
  );
}
