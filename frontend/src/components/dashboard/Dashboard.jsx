import { useWeather } from "../../hooks/useWeather";
import WeatherSummary from "./WeatherSummary";
import WeatherAnalytics from "./WeatherAnalytics";
import WeatherTable from "./WeatherTable";

function Dashboard() {
    const {
        weatherData,
        loading,
        error,
        refreshWeather,
    } = useWeather();

    if (loading) {
        return (
            <section className="dashboard-state">
                <div className="spinner"></div>
                <h2>Loading Weather Data</h2>
                <p>Fetching the latest weather information...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="dashboard-state">
                <div className="state-icon">⚠</div>

                <h2>Unable to Load Weather Data</h2>

                <p>{error}</p>

                <button
                    className="primary-button"
                    onClick={refreshWeather}
                >
                    Try Again
                </button>
            </section>
        );
    }

    return (
        <div className="dashboard-content">
            <div className="dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">
                        WEATHER OVERVIEW
                    </span>

                    <h2>Today's Weather Intelligence</h2>

                    <p>
                        Monitor weather conditions and compare
                        comfort levels across cities.
                    </p>
                </div>

                <button
                    className="refresh-button"
                    onClick={refreshWeather}
                >
                    ↻
                    <span>Refresh Data</span>
                </button>
            </div>

            <WeatherSummary
                weatherData={weatherData}
            />

            <WeatherAnalytics
                weatherData={weatherData}
            />

            <WeatherTable
                weatherData={weatherData}
            />
        </div>
    );
}

export default Dashboard;