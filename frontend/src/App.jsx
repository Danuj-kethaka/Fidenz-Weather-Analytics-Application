import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

function App() {
    const {
        isAuthenticated,
        isLoading,
        user,
        loginWithRedirect,
        logout,
        getAccessTokenSilently
    } = useAuth0();

    const [weatherData, setWeatherData] = useState([]);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [error, setError] = useState("");

    // -------------------------------
    // Theme
    // -------------------------------

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    // -------------------------------
    // Search & Sorting
    // -------------------------------

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("rank");

    const API_URL = "https://localhost:7202";

    // -------------------------------
    // Theme Toggle
    // -------------------------------

    const toggleDarkMode = () => {
        setDarkMode((current) => {
            const newMode = !current;

            localStorage.setItem(
                "theme",
                newMode ? "dark" : "light"
            );

            return newMode;
        });
    };

    // -------------------------------
    // Login
    // -------------------------------

    const handleLogin = async () => {
        try {
            setError("");

            await loginWithRedirect({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    redirect_uri: window.location.origin
                }
            });
        } catch (err) {
            console.error("Auth0 Login Error:", err);
            setError(err.message || "Login failed");
        }
    };

    // -------------------------------
    // Logout
    // -------------------------------

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    };

    // -------------------------------
    // Load Weather
    // -------------------------------

    const loadWeather = async () => {
        if (!isAuthenticated) {
            return;
        }

        try {
            setLoadingWeather(true);
            setError("");

            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE
                }
            });

            const response = await fetch(
                `${API_URL}/api/weather`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Weather API request failed: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();

            setWeatherData(data);
        } catch (err) {
            console.error("Weather API Error:", err);
            setError(
                err.message ||
                "Unable to load weather data."
            );
        } finally {
            setLoadingWeather(false);
        }
    };

    // -------------------------------
    // Initial Weather Load
    // -------------------------------

    useEffect(() => {
        loadWeather();
    }, [isAuthenticated]);

    // -------------------------------
    // Loading Screen
    // -------------------------------

    if (isLoading) {
        return (
            <div
                className={`loading-screen ${darkMode ? "dark-mode" : ""
                    }`}
            >
                <div className="loading-brand">
                    <div className="loading-logo">
                        ☁
                    </div>

                    <h2>Fidenz Weather</h2>
                </div>

                <div className="spinner"></div>

                <p>Preparing your weather dashboard...</p>
            </div>
        );
    }

    // -------------------------------
    // Login Screen
    // -------------------------------

    if (!isAuthenticated) {
        return (
            <div
                className={`login-page ${darkMode ? "dark-mode" : ""
                    }`}
            >
                <button
                    className="login-theme-button"
                    onClick={toggleDarkMode}
                    title={
                        darkMode
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>

                <div className="login-decoration decoration-one"></div>
                <div className="login-decoration decoration-two"></div>

                <div className="login-card">

                    <div className="login-logo">
                        ☁
                    </div>

                    <div className="login-badge">
                        SECURE WEATHER INTELLIGENCE
                    </div>

                    <h1>
                        Fidenz Weather
                        <span>Analytics</span>
                    </h1>

                    <p className="login-description">
                        Analyze real-time weather conditions,
                        compare comfort levels and discover
                        the most comfortable cities.
                    </p>

                    <div className="login-features">
                        <div className="login-feature">
                            <span>🌍</span>
                            <div>
                                <strong>10 Cities</strong>
                                <small>
                                    Global weather coverage
                                </small>
                            </div>
                        </div>

                        <div className="login-feature">
                            <span>📊</span>
                            <div>
                                <strong>Comfort Index</strong>
                                <small>
                                    Smart weather analysis
                                </small>
                            </div>
                        </div>

                        <div className="login-feature">
                            <span>🔐</span>
                            <div>
                                <strong>Secure Access</strong>
                                <small>
                                    Auth0 protected
                                </small>
                            </div>
                        </div>
                    </div>

                    <button
                        className="primary-button login-button"
                        onClick={handleLogin}
                    >
                        <span>Login to Dashboard</span>
                        <span className="button-arrow">
                            →
                        </span>
                    </button>

                    {error && (
                        <div className="error-message login-error">
                            {error}
                        </div>
                    )}

                    <div className="login-security">
                        <span className="security-dot"></span>
                        Protected with Auth0 authentication
                    </div>
                </div>

                <div className="login-footer">
                    Fidenz Weather Analytics
                </div>
            </div>
        );
    }

    // -------------------------------
    // Summary Statistics
    // -------------------------------

    const averageScore =
        weatherData.length > 0
            ? (
                weatherData.reduce(
                    (total, city) =>
                        total + city.comfortIndex,
                    0
                ) / weatherData.length
            ).toFixed(2)
            : "0.00";

    const topCity =
        weatherData.length > 0
            ? weatherData[0].cityName
            : "-";

    const topScore =
        weatherData.length > 0
            ? weatherData[0].comfortIndex.toFixed(2)
            : "0.00";

    // -------------------------------
    // Search & Sort
    // -------------------------------

    const displayedWeatherData = [...weatherData]
        .filter((city) => {
            const search =
                searchTerm.toLowerCase().trim();

            if (!search) {
                return true;
            }

            return (
                city.cityName
                    .toLowerCase()
                    .includes(search) ||
                city.weatherDescription
                    .toLowerCase()
                    .includes(search)
            );
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "comfortHigh":
                    return (
                        b.comfortIndex -
                        a.comfortIndex
                    );

                case "comfortLow":
                    return (
                        a.comfortIndex -
                        b.comfortIndex
                    );

                case "temperatureHigh":
                    return (
                        b.temperature -
                        a.temperature
                    );

                case "temperatureLow":
                    return (
                        a.temperature -
                        b.temperature
                    );

                case "humidityHigh":
                    return (
                        b.humidity -
                        a.humidity
                    );

                case "humidityLow":
                    return (
                        a.humidity -
                        b.humidity
                    );

                case "cityAZ":
                    return a.cityName.localeCompare(
                        b.cityName
                    );

                case "rank":
                default:
                    return a.rank - b.rank;
            }
        });

    // -------------------------------
    // Dashboard
    // -------------------------------

    return (
        <div
            className={`app ${darkMode ? "dark-mode" : ""
                }`}
        >
            {/* TOP BAR */}

            <header className="topbar">

                <div className="brand">
                    <div className="brand-icon">
                        ☁
                    </div>

                    <div>
                        <h1>
                            Fidenz Weather
                        </h1>

                        <span>
                            Analytics Dashboard
                        </span>
                    </div>
                </div>

                <div className="user-section">

                    <div className="user-info">
                        <span className="user-label">
                            Signed in as
                        </span>

                        <strong>
                            {user?.email}
                        </strong>
                    </div>

                    <button
                        className="theme-button"
                        onClick={toggleDarkMode}
                        title={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>
            </header>

            {/* MAIN */}

            <main className="dashboard">

                {/* HEADING */}

                <section className="dashboard-heading">

                    <div>

                        <div className="eyebrow">
                            WEATHER INSIGHTS
                        </div>

                        <h2>
                            Weather Analytics
                        </h2>

                        <p>
                            Compare current weather
                            conditions and comfort
                            levels across cities.
                        </p>

                    </div>

                    <button
                        className="refresh-button"
                        onClick={loadWeather}
                        disabled={loadingWeather}
                    >
                        <span className="refresh-icon">
                            ↻
                        </span>

                        {loadingWeather
                            ? "Refreshing..."
                            : "Refresh Data"}
                    </button>

                </section>

                {/* ERROR */}

                {error && (
                    <div className="error-message dashboard-error">
                        <span>⚠️</span>
                        {error}
                    </div>
                )}

                {/* SUMMARY CARDS */}

                <section className="summary-grid">

                    <div className="summary-card">
                        <div className="summary-icon">
                            🌍
                        </div>

                        <div className="summary-content">
                            <span>
                                Total Cities
                            </span>

                            <strong>
                                {weatherData.length}
                            </strong>

                            <small>
                                Active locations
                            </small>
                        </div>
                    </div>

                    <div className="summary-card featured-card">
                        <div className="summary-icon">
                            🏆
                        </div>

                        <div className="summary-content">
                            <span>
                                Most Comfortable
                            </span>

                            <strong>
                                {topCity}
                            </strong>

                            <small>
                                Score: {topScore}
                            </small>
                        </div>
                    </div>

                    <div className="summary-card">
                        <div className="summary-icon">
                            📊
                        </div>

                        <div className="summary-content">
                            <span>
                                Average Comfort
                            </span>

                            <strong>
                                {averageScore}
                            </strong>

                            <small>
                                Out of 100
                            </small>
                        </div>
                    </div>

                </section>

                {/* RANKING */}

                <section className="ranking-section">

                    <div className="section-header">

                        <div>
                            <div className="section-title-row">
                                <h3>
                                    Comfort Ranking
                                </h3>

                                <span className="city-count">
                                    {weatherData.length} cities
                                </span>
                            </div>

                            <p>
                                Cities ranked from most
                                to least comfortable
                            </p>
                        </div>

                        <div className="live-indicator">
                            <span></span>
                            Live Data
                        </div>

                    </div>

                    {/* SEARCH + SORT */}

                    <div className="table-controls">

                        <div className="search-box">

                            <span className="search-icon">
                                🔎
                            </span>

                            <input
                                type="text"
                                placeholder="Search city or weather..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                                }
                            />

                            {searchTerm && (
                                <button
                                    className="clear-search"
                                    onClick={() =>
                                        setSearchTerm("")
                                    }
                                >
                                    ×
                                </button>
                            )}

                        </div>

                        <div className="sort-box">

                            <label htmlFor="sortWeather">
                                Sort by
                            </label>

                            <select
                                id="sortWeather"
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="rank">
                                    Default Ranking
                                </option>

                                <option value="comfortHigh">
                                    Comfort: High → Low
                                </option>

                                <option value="comfortLow">
                                    Comfort: Low → High
                                </option>

                                <option value="temperatureHigh">
                                    Temperature: High → Low
                                </option>

                                <option value="temperatureLow">
                                    Temperature: Low → High
                                </option>

                                <option value="humidityHigh">
                                    Humidity: High → Low
                                </option>

                                <option value="humidityLow">
                                    Humidity: Low → High
                                </option>

                                <option value="cityAZ">
                                    City: A → Z
                                </option>
                            </select>

                        </div>

                    </div>

                    {/* TABLE */}

                    {loadingWeather &&
                        weatherData.length === 0 ? (
                        <div className="loading-card">

                            <div className="spinner"></div>

                            <p>
                                Loading weather data...
                            </p>

                        </div>
                    ) : weatherData.length > 0 ? (

                        displayedWeatherData.length > 0 ? (

                            <div className="weather-table-container">

                                <table className="weather-table">

                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>City</th>
                                            <th>Weather</th>
                                            <th>Temperature</th>
                                            <th>Feels Like</th>
                                            <th>Humidity</th>
                                            <th>Wind</th>
                                            <th>Clouds</th>
                                            <th>
                                                Comfort Index
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {displayedWeatherData.map(
                                            (city) => (
                                                <tr
                                                    key={
                                                        city.cityName
                                                    }
                                                >

                                                    <td>
                                                        <span
                                                            className={
                                                                city.rank ===
                                                                    1
                                                                    ? "rank-badge top-rank"
                                                                    : "rank-badge"
                                                            }
                                                        >
                                                            {city.rank}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <strong className="city-name">
                                                            {city.cityName}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        <span className="weather-description">
                                                            {
                                                                city.weatherDescription
                                                            }
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="data-value">
                                                            {city.temperature.toFixed(
                                                                1
                                                            )}
                                                            °C
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {city.feelsLike.toFixed(
                                                            1
                                                        )}
                                                        °C
                                                    </td>

                                                    <td>
                                                        {city.humidity}%
                                                    </td>

                                                    <td>
                                                        {city.windSpeed.toFixed(
                                                            1
                                                        )}{" "}
                                                        m/s
                                                    </td>

                                                    <td>
                                                        {city.cloudiness}%
                                                    </td>

                                                    <td>

                                                        <div className="comfort-cell">

                                                            <div className="comfort-score">
                                                                {city.comfortIndex.toFixed(
                                                                    2
                                                                )}
                                                            </div>

                                                            <div className="progress-bar">

                                                                <div
                                                                    className="progress-fill"
                                                                    style={{
                                                                        width: `${city.comfortIndex}%`
                                                                    }}
                                                                ></div>

                                                            </div>

                                                        </div>

                                                    </td>

                                                </tr>
                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        ) : (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    🔎
                                </div>

                                <h4>
                                    No cities found
                                </h4>

                                <p>
                                    Try searching for a
                                    different city or weather
                                    condition.
                                </p>

                                <button
                                    className="clear-filter-button"
                                    onClick={() =>
                                        setSearchTerm("")
                                    }
                                >
                                    Clear Search
                                </button>

                            </div>
                        )

                    ) : (

                        <div className="empty-state">

                            <div className="empty-icon">
                                🌤️
                            </div>

                            <h4>
                                No weather data available
                            </h4>

                            <p>
                                Refresh the dashboard to
                                retrieve the latest data.
                            </p>

                        </div>
                    )}

                </section>

                {/* INFORMATION */}

                <section className="info-section">

                    <div className="info-main">

                        <div className="info-icon">
                            📈
                        </div>

                        <div>
                            <h3>
                                Comfort Index
                            </h3>

                            <p>
                                The Comfort Index combines
                                temperature, humidity,
                                wind speed and cloudiness
                                to produce a score between
                                0 and 100.
                            </p>
                        </div>

                    </div>

                    <div className="cache-info">

                        <span className="cache-dot"></span>

                        <div>
                            <strong>
                                Weather data caching
                            </strong>

                            <p>
                                Responses are cached for
                                5 minutes to reduce
                                unnecessary API requests.
                            </p>
                        </div>

                    </div>

                </section>

            </main>

            {/* FOOTER */}

            <footer>
                <p>
                    Fidenz Weather Analytics
                    <span> · </span>
                    Secure weather intelligence
                    <span> · </span>
                    Real-time insights
                </p>
            </footer>

        </div>
    );
}

export default App;