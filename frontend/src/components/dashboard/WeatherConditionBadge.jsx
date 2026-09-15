function WeatherConditionBadge({ condition }) {
    const value = (condition || "Unknown").toLowerCase();

    let icon = "☁";
    let className = "condition-clouds";

    if (value.includes("clear")) {
        icon = "☀";
        className = "condition-clear";
    } else if (
        value.includes("rain") ||
        value.includes("drizzle")
    ) {
        icon = "🌧";
        className = "condition-rain";
    } else if (
        value.includes("thunder")
    ) {
        icon = "⛈";
        className = "condition-storm";
    } else if (
        value.includes("snow")
    ) {
        icon = "❄";
        className = "condition-snow";
    } else if (
        value.includes("mist") ||
        value.includes("fog") ||
        value.includes("haze")
    ) {
        icon = "🌫";
        className = "condition-mist";
    }

    return (
        <div className={`weather-condition-badge ${className}`}>
            <span className="condition-icon">
                {icon}
            </span>

            <span>
                {condition || "Unknown"}
            </span>
        </div>
    );
}

export default WeatherConditionBadge;