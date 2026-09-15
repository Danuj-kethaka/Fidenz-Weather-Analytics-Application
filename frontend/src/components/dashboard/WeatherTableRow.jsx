import WeatherConditionBadge from "./WeatherConditionBadge";

function WeatherTableRow({ city, rank }) {
    const getComfortClass = (comfort) => {
        const value = Number(comfort || 0);

        if (value >= 75) {
            return "comfort-good";
        }

        if (value >= 50) {
            return "comfort-average";
        }

        return "comfort-poor";
    };

    return (
        <tr>
            {/* Rank */}
            <td>
                <div className="table-rank">
                    #{rank}
                </div>
            </td>

            {/* City */}
            <td>
                <div className="table-city">
                    <strong>{city.cityName}</strong>
                </div>
            </td>

            {/* Weather */}
            <td>
                <WeatherConditionBadge
                    condition={city.weatherDescription}
                />
            </td>

            {/* Temperature */}
            <td>
                <span className="temperature-value">
                    {Number(city.temperature || 0).toFixed(1)}&deg;C
                </span>
            </td>

            {/* Feels Like */}
            <td>
                <span className="temperature-value">
                    {Number(city.feelsLike || 0).toFixed(1)}&deg;C
                </span>

                <small>
                    Perceived temperature
                </small>
            </td>

            {/* Humidity */}
            <td>
                <span className="humidity-value">
                    {Number(city.humidity || 0).toFixed(1)}%
                </span>
            </td>

            {/* Wind */}
            <td>
                <span className="wind-value">
                    {Number(city.windSpeed || 0).toFixed(1)}
                </span>

                <small>
                    m/s
                </small>
            </td>

            {/* Clouds */}
            <td>
                <span className="cloud-value">
                    {Number(city.cloudiness || 0)}%
                </span>
            </td>

            {/* Comfort */}
            <td>
                <span
                    className={`comfort-badge ${getComfortClass(
                        city.comfortIndex
                    )}`}
                >
                    {Number(
                        city.comfortIndex || 0
                    ).toFixed(1)}
                </span>
            </td>
        </tr>
    );
}

export default WeatherTableRow;