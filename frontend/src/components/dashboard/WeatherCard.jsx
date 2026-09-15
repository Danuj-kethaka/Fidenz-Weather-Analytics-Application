function WeatherCard({
    icon,
    label,
    value,
    unit,
    description,
}) {
    return (
        <div className="weather-card">
            <div className="weather-card-top">
                <div className="weather-card-icon">
                    {icon}
                </div>

                <span className="weather-card-label">
                    {label}
                </span>
            </div>

            <div className="weather-card-value">
                {value}
                {unit && (
                    <span className="weather-card-unit">
                        {unit}
                    </span>
                )}
            </div>

            <p className="weather-card-description">
                {description}
            </p>
        </div>
    );
}

export default WeatherCard;