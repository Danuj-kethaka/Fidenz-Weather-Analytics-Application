import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function TemperatureChart({ weatherData }) {
    const chartData = weatherData.map((city) => ({
        city: city.cityName,
        temperature: Number(city.temperature || 0),
    }));

    return (
        <div className="analytics-card temperature-chart-card">
            <div className="analytics-card-header">
                <div>
                    <span className="analytics-label">
                        TEMPERATURE
                    </span>

                    <h3>Temperature by City</h3>

                    <p>
                        Compare current temperatures across monitored cities.
                    </p>
                </div>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#20334c"
                        />

                        <XAxis
                            dataKey="city"
                            tick={{
                                fill: "#71839d",
                                fontSize: 11,
                            }}
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                            angle={-35}
                            textAnchor="end"
                            height={65}
                        />

                        <YAxis
                            tick={{
                                fill: "#71839d",
                                fontSize: 11,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#101f34",
                                border: "1px solid #29415f",
                                borderRadius: "8px",
                                color: "#ffffff",
                            }}
                            formatter={(value) => [
                                `${value} \u00B0C`,
                                "Temperature",
                            ]}
                        />

                        <Bar
                            dataKey="temperature"
                            fill="#438ee8"
                            radius={[5, 5, 0, 0]}
                            barSize={34}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TemperatureChart;