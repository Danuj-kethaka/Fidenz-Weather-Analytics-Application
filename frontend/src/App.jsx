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

    const API_URL = "https://localhost:7202";

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

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    };

    useEffect(() => {
        const loadWeather = async () => {
            if (!isAuthenticated) {
                return;
            }

            try {
                setLoadingWeather(true);
                setError("");

                console.log("Getting Auth0 access token...");

                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE
                    }
                });

                console.log("Access token received.");

                const response = await fetch(`${API_URL}/api/weather`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(
                        `Weather API request failed: ${response.status} ${response.statusText}`
                    );
                }

                const data = await response.json();

                console.log("Weather data received:", data);

                setWeatherData(data);
            } catch (err) {
                console.error("Weather API Error:", err);
                setError(err.message || "Unable to load weather data.");
            } finally {
                setLoadingWeather(false);
            }
        };

        loadWeather();
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Fidenz Weather Analytics</h1>

            {!isAuthenticated ? (
                <div>
                    <button onClick={handleLogin}>
                        Login
                    </button>

                    {error && (
                        <div>
                            <h3>Login Error:</h3>
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>Welcome</h2>

                    <p>
                        Logged in as: {user?.email}
                    </p>

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                    <hr />

                    <h2>Weather Analytics</h2>

                    {loadingWeather && (
                        <p>Loading weather data...</p>
                    )}

                    {error && (
                        <div>
                            <h3>Error:</h3>
                            <p>{error}</p>
                        </div>
                    )}

                    {!loadingWeather && !error && weatherData.length > 0 && (
                        <div>
                            {weatherData.map((city) => (
                                <div key={city.cityName}>
                                    <h3>
                                        Rank {city.rank}: {city.cityName}
                                    </h3>

                                    <p>
                                        Temperature: {city.temperature} °C
                                    </p>

                                    <p>
                                        Feels Like: {city.feelsLike} °C
                                    </p>

                                    <p>
                                        Humidity: {city.humidity}%
                                    </p>

                                    <p>
                                        Wind Speed: {city.windSpeed} m/s
                                    </p>

                                    <p>
                                        Cloudiness: {city.cloudiness}%
                                    </p>

                                    <p>
                                        Comfort Index: {city.comfortIndex}
                                    </p>

                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}

                    {!loadingWeather &&
                        !error &&
                        weatherData.length === 0 && (
                            <p>No weather data available.</p>
                        )}
                </div>
            )}
        </div>
    );
}

export default App;