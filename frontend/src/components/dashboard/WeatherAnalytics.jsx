import TemperatureChart from "./TemperatureChart";
import ComfortChart from "./ComfortChart";

function WeatherAnalytics({ weatherData }) {
    return (
        <section
            id="analytics"
            className="weather-analytics"
        >
            <TemperatureChart
                weatherData={weatherData}
            />

            <ComfortChart
                weatherData={weatherData}
            />
        </section>
    );
}

export default WeatherAnalytics;