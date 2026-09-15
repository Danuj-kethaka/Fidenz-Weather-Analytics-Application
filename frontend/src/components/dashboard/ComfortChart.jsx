function ComfortChart({ weatherData }) {
    const rankedCities = [...weatherData]
        .sort(
            (a, b) =>
                Number(b.comfortIndex || 0) -
                Number(a.comfortIndex || 0)
        )
        .slice(0, 5);

    return (
        <div className="analytics-card comfort-chart-card">
            <div className="analytics-card-header">
                <div>
                    <span className="analytics-label">
                        COMFORT
                    </span>

                    <h3>Comfort Ranking</h3>

                    <p>
                        Top cities based on overall comfort.
                    </p>
                </div>
            </div>

            <div className="comfort-ranking">
                {rankedCities.map((city, index) => (
                    <div
                        className="comfort-ranking-item"
                        key={city.cityName}
                    >
                        <div className="comfort-rank">
                            {index + 1}
                        </div>

                        <div className="comfort-city">
                            <strong>
                                {city.cityName}
                            </strong>

                            <div className="comfort-bar">
                                <div
                                    className="comfort-bar-fill"
                                    style={{
                                        width: `${Math.min(
                                            Number(city.comfortIndex || 0),
                                            100
                                        )}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="comfort-score">
                            <strong>
                                {Number(
                                    city.comfortIndex || 0
                                ).toFixed(1)}
                            </strong>

                            <span>/100</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ComfortChart;