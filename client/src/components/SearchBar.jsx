function SearchBar({ value, onChange }) {
  return (
    <div className="search-box">
      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search by name, email, department or role..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;