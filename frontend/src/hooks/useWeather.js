import { useCallback, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getWeatherData } from "../services/weatherService";

const API_URL = import.meta.env.PROD
    ? window.location.origin
    : "https://localhost:7202";

export const useWeather = () => {
    const {
        isAuthenticated,
        getAccessTokenSilently,
    } = useAuth0();

    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadWeather = useCallback(async () => {
        if (!isAuthenticated) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                },
            });

            const data = await getWeatherData(token, API_URL);

            setWeatherData(data);
        } catch (err) {
            console.error("Weather API Error:", err);

            setError(
                err.message || "Unable to load weather data."
            );
        } finally {
            setLoading(false);
        }
    }, [
        isAuthenticated,
        getAccessTokenSilently,
    ]);

    useEffect(() => {
        loadWeather();
    }, [loadWeather]);

    return {
        weatherData,
        loading,
        error,
        refreshWeather: loadWeather,
    };
};