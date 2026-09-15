import { useMemo, useState } from "react";

import WeatherTableControls from "./WeatherTableControls";
import WeatherTableRow from "./WeatherTableRow";

function WeatherTable({ weatherData }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("rank");

    const processedData = useMemo(() => {
        const searchValue = searchTerm
            .trim()
            .toLowerCase();

        let filteredData = weatherData.filter((city) => {
            if (!searchValue) {
                return true;
            }

            const cityName =
                city.cityName?.toLowerCase() || "";

            const description =
                city.weatherDescription?.toLowerCase() || "";

            return (
                cityName.includes(searchValue) ||
                description.includes(searchValue)
            );
        });

        filteredData = [...filteredData];

        switch (sortOption) {
            case "comfort-high":
                filteredData.sort(
                    (a, b) =>
                        Number(b.comfortIndex || 0) -
                        Number(a.comfortIndex || 0)
                );
                break;

            case "comfort-low":
                filteredData.sort(
                    (a, b) =>
                        Number(a.comfortIndex || 0) -
                        Number(b.comfortIndex || 0)
                );
                break;

            case "temperature-high":
                filteredData.sort(
                    (a, b) =>
                        Number(b.temperature || 0) -
                        Number(a.temperature || 0)
                );
                break;

            case "temperature-low":
                filteredData.sort(
                    (a, b) =>
                        Number(a.temperature || 0) -
                        Number(b.temperature || 0)
                );
                break;

            case "humidity-high":
                filteredData.sort(
                    (a, b) =>
                        Number(b.humidity || 0) -
                        Number(a.humidity || 0)
                );
                break;

            case "humidity-low":
                filteredData.sort(
                    (a, b) =>
                        Number(a.humidity || 0) -
                        Number(b.humidity || 0)
                );
                break;

            case "city":
                filteredData.sort((a, b) =>
                    (a.cityName || "").localeCompare(
                        b.cityName || ""
                    )
                );
                break;

            case "rank":
            default:
                filteredData.sort(
                    (a, b) =>
                        Number(a.rank || 999) -
                        Number(b.rank || 999)
                );
                break;
        }

        return filteredData;
    }, [weatherData, searchTerm, sortOption]);

    return (
        <section
            id="weather-cities"
            className="weather-table-section"
        >
            <div className="weather-table-header">
                <div>
                    <span className="analytics-label">
                        CITY CONDITIONS
                    </span>

                    <h3>Weather Comparison</h3>

                    <p>
                        Compare current weather conditions
                        across all monitored cities.
                    </p>
                </div>

                <div className="table-result-count">
                    {processedData.length} of{" "}
                    {weatherData.length} cities
                </div>
            </div>

            <WeatherTableControls
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortOption={sortOption}
                onSortChange={setSortOption}
            />

            <div className="weather-table-wrapper">
                <table className="weather-table">
                    <thead>
                        <tr>
                            <th>RANK</th>
                            <th>CITY</th>
                            <th>WEATHER</th>
                            <th>TEMPERATURE</th>
                            <th>FEELS LIKE</th>
                            <th>HUMIDITY</th>
                            <th>WIND</th>
                            <th>CLOUDS</th>
                            <th>COMFORT INDEX</th>
                        </tr>
                    </thead>

                    <tbody>
                        {processedData.length > 0 ? (
                            processedData.map((city, index) => (
                                <WeatherTableRow
                                    key={`${city.cityName}-${index}`}
                                    city={city}
                                    rank={city.rank || index + 1}
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="9"
                                    className="table-empty"
                                >
                                    No cities match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default WeatherTable;