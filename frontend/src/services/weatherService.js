export const getWeatherData = async (token, apiUrl) => {
    const response = await fetch(`${apiUrl}/api/weather`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(
            `Weather API request failed: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
};