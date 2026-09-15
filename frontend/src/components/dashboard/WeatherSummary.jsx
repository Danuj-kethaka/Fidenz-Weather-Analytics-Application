import WeatherCard from "./WeatherCard";

function WeatherSummary({ weatherData }) {
    if (!weatherData || weatherData.length === 0) {
        return null;
    }

    const averageTemperature =
        weatherData.reduce(
            (total, city) => total + Number(city.temperature || 0),
            0
        ) / weatherData.length;

    const averageHumidity =
        weatherData.reduce(
            (total, city) => total + Number(city.humidity || 0),
            0
        ) / weatherData.length;

    const averageComfort =
        weatherData.reduce(
            (total, city) => total + Number(city.comfortIndex || 0),
            0
        ) / weatherData.length;

    return (
        <section className="weather-summary">
            <WeatherCard
                icon="🌍"
                label="TOTAL CITIES"
                value={weatherData.length}
                description="Cities monitored"
            />

            <WeatherCard
                icon="🌡"
                label="AVG TEMPERATURE"
                value={averageTemperature.toFixed(1)}
                unit="°C"
                description="Average across all cities"
            />

            <WeatherCard
                icon="💧"
                label="AVG HUMIDITY"
                value={averageHumidity.toFixed(1)}
                unit="%"
                description="Average humidity level"
            />

            <WeatherCard
                icon="☁"
                label="AVG COMFORT"
                value={averageComfort.toFixed(1)}
                unit="/100"
                description="Overall comfort index"
            />
        </section>
    );
}

export default WeatherSummary;