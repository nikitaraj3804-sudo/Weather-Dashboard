export default function Favorites({ favorites, onSelect, onRemove }) {
  if (favorites.length === 0) {
    return <p className="muted">No favorites yet. Save a city to see it here.</p>;
  }
  return (
    <ul className="favorites">
      {favorites.map((c) => (
        <li key={`${c.latitude},${c.longitude}`}>
          <button onClick={() => onSelect(c)}>{c.name}</button>
          <button className="ghost" onClick={() => onRemove(c)} aria-label={`Remove ${c.name}`}>×</button>
        </li>
      ))}
    </ul>
  );
}
