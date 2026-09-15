function WeatherTableControls({
    searchTerm,
    onSearchChange,
    sortOption,
    onSortChange,
}) {
    return (
        <div className="weather-table-controls">
            <div className="table-search">
                <span className="search-icon">
                    ⌕
                </span>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Search cities or weather conditions..."
                />
            </div>

            <div className="table-sort">
                <label htmlFor="weather-sort">
                    Sort by
                </label>

                <select
                    id="weather-sort"
                    value={sortOption}
                    onChange={(event) =>
                        onSortChange(event.target.value)
                    }
                >
                    <option value="rank">
                        Comfort Rank
                    </option>

                    <option value="comfort-high">
                        Comfort: High to Low
                    </option>

                    <option value="comfort-low">
                        Comfort: Low to High
                    </option>

                    <option value="temperature-high">
                        Temperature: High to Low
                    </option>

                    <option value="temperature-low">
                        Temperature: Low to High
                    </option>

                    <option value="humidity-high">
                        Humidity: High to Low
                    </option>

                    <option value="humidity-low">
                        Humidity: Low to High
                    </option>

                    <option value="city">
                        City: A to Z
                    </option>
                </select>
            </div>
        </div>
    );
}

export default WeatherTableControls;