# Weather Dashboard

A responsive weather app built with React and Vite. Search any city, see current conditions and a 5-day forecast, and save favorite cities.

**Live demo:** _add your Vercel/Netlify link here_

## Features
- City search with suggestions (debounced so it doesn't call the API on every keystroke)
- Current weather: temperature, humidity, wind
- 5-day forecast
- Favorites saved in the browser (persist after refresh)
- °C / °F toggle and light / dark mode (remembered)
- Loading and error states; responsive layout

## Tech stack
React 18, Vite, Context API, custom hooks, CSS (Flexbox + Grid), [Open-Meteo API](https://open-meteo.com/) (no API key needed)

## Concepts used
- `useState`, `useEffect` (with dependency array and cleanup), custom hooks (`useDebounce`, `useLocalStorage`)
- Context API for shared settings (unit and theme)
- Controlled input, lists with keys, conditional rendering
- `fetch` with async handling and `res.ok` checks
- Mobile-first responsive CSS

## Run locally
```bash
npm install
npm run dev
```

## What I learned
- _Write 2-3 lines in your own words (e.g., debouncing, effect cleanup, lifting state)._

## Future improvements
- Use my location, hourly forecast chart, React Router page per city
