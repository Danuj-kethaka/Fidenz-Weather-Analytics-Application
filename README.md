# Fidenz Weather Analytics

A secure full-stack weather analytics application developed for the Fidenz Technologies Trainee Software Engineer technical assignment.

The application retrieves real-time weather data for a predefined list of cities, calculates a custom Comfort Index score, and ranks cities from most to least comfortable.

## Features

- Real-time weather data using OpenWeatherMap
- Weather analysis for 10 cities
- Custom Comfort Index from 0–100
- Automatic city ranking
- Server-side weather caching for 5 minutes
- Cache HIT/MISS debug endpoint
- Auth0 authentication and authorization
- Whitelisted user access
- Email verification requirement
- Public signup disabled
- Responsive desktop and mobile UI
- City and weather search
- Sorting functionality
- Light and dark mode

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Auth0 React SDK

### Backend

- ASP.NET Core Web API
- .NET 8
- C#
- HttpClient
- IMemoryCache

### Authentication

- Auth0
- JWT Bearer Authentication
- OAuth 2.0 / OpenID Connect

### External API

- OpenWeatherMap API

---

# Comfort Index

The application calculates a custom Comfort Index between 0 and 100 using four weather parameters.

| Parameter | Weight |
|-----------|--------|
| Temperature | 40% |
| Humidity | 25% |
| Wind Speed | 20% |
| Cloudiness | 15% |

The individual parameter scores are calculated as follows.

### Temperature Score

The preferred temperature is 22°C.

Temperature Score:

100 - (|Temperature - 22| × 5)

The result is limited to a range of 0–100.

### Humidity Score

The preferred humidity is 50%.

Humidity Score:

100 - (|Humidity - 50| × 2)

The result is limited to a range of 0–100.

### Wind Score

The preferred wind speed is 2 m/s.

Wind Score:

100 - (|Wind Speed - 2| × 20)

The result is limited to a range of 0–100.

### Cloudiness Score

The preferred cloudiness level is 30%.

Cloudiness Score:

100 - |Cloudiness - 30|

The result is limited to a range of 0–100.

### Final Comfort Index

The final score is calculated using the weighted parameter scores:

Comfort Index =
(Temperature Score × 0.40)
+ (Humidity Score × 0.25)
+ (Wind Score × 0.20)
+ (Cloudiness Score × 0.15)

The final score is rounded to two decimal places.

Cities are then sorted in descending order of their Comfort Index, with the highest score receiving Rank 1.

## Reasoning Behind the Weights

Temperature receives the highest weight of 40% because it has the strongest direct influence on perceived outdoor comfort.

Humidity receives 25% because both high and low humidity can affect how comfortable a temperature feels.

Wind speed receives 20% because moderate wind can improve comfort, while stronger wind can make outdoor conditions less comfortable.

Cloudiness receives 15% because cloud cover can influence outdoor conditions but has a lower overall impact compared with temperature, humidity, and wind.

The weights total 100%, ensuring that all four parameters contribute proportionally to the final score.

---

# Weather Data

City codes are stored in:

backend/Data/cities.json

The application currently processes 10 cities.

The backend uses the OpenWeatherMap API to retrieve current weather information using each city's OpenWeatherMap city ID.

The API request follows:

GET https://api.openweathermap.org/data/2.5/weather?id={cityId}&appid={apiKey}

The application uses metric units for temperature.

---

# Caching Strategy

The backend uses ASP.NET Core IMemoryCache for server-side caching.

Each city's weather response is stored using a city-specific cache key:

weather_{cityCode}

For example:

weather_1248991

Weather responses are cached for 5 minutes.

### Cache HIT

If weather data is already available in the cache, the backend returns the cached response without making another request to OpenWeatherMap.

### Cache MISS

If the weather data is not available in the cache, the backend requests the data from OpenWeatherMap, stores the response in the cache, and returns it to the client.

This reduces unnecessary external API requests and improves response performance.

### Cache Debug Endpoint

The application provides:

GET /api/weather/cache/{cityCode}

The endpoint returns whether the requested city's weather data is currently cached.

Possible statuses:

- HIT
- MISS

---

# Authentication and Authorization

Auth0 is used to secure the application.

Only authenticated users can access the Comfort Index dashboard.

The backend API uses JWT Bearer authentication and protected endpoints use the `[Authorize]` attribute.

The application also includes:

- Login and logout
- Public signup disabled
- Whitelisted user access
- Email verification requirement

The assignment test account is:

Email:
careers@fidenz.com

Password:
Pass#fidenz

Users who are not included in the whitelist are denied access.

---

# API Endpoints

### Get all weather analytics

GET /api/weather

Returns weather information, Comfort Index scores, and ranking for all configured cities.

### Get weather for a specific city

GET /api/weather/{cityCode}

Returns weather information for the specified city.

### Check cache status

GET /api/weather/cache/{cityCode}

Returns the cache status for the specified city.

---

# Setup Instructions

## Prerequisites

Install the following:

- .NET 8 SDK
- Visual Studio 2022 or later
- Node.js
- npm
- Git

You also need:

- An OpenWeatherMap API key
- An Auth0 application
- An Auth0 API

## Backend Setup

Open a terminal and navigate to the backend folder:

cd backend

Restore the .NET dependencies:

dotnet restore

Configure the OpenWeatherMap API key in the backend configuration.

Run the backend:

dotnet run

The backend runs locally using the configured ASP.NET Core development URL.

## Frontend Setup

Navigate to the frontend folder:

cd frontend

Install the required packages:

npm install

Create a `.env` file containing the required Auth0 configuration:

VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=https://fidenz-weather-api
VITE_API_URL=https://localhost:7202

Start the React development server:

npm run dev

The frontend runs locally at:

http://localhost:5173

## Auth0 Local Configuration

For local development, configure the Auth0 application with:

Allowed Callback URLs:

http://localhost:5173/

Allowed Logout URLs:

http://localhost:5173/

Allowed Web Origins:

http://localhost:5173

The Auth0 API audience must match:

https://fidenz-weather-api

---

# Design Trade-offs

## In-Memory Caching

IMemoryCache was selected because the application is small and does not require a distributed caching infrastructure.

Advantages:

- Simple implementation
- Fast access
- Easy to maintain
- No additional infrastructure required

Trade-off:

The cache exists only in the application's memory and is cleared when the application restarts.

For a larger production system with multiple backend instances, a distributed cache such as Redis would be more suitable.

## Sequential Weather Requests

The backend currently retrieves weather data for the configured cities sequentially.

This keeps the implementation simple and easier to understand.

A larger production system could use controlled parallel requests to reduce response time while respecting OpenWeatherMap API rate limits.

---

# Known Limitations

- Weather data depends on the availability of OpenWeatherMap.
- OpenWeatherMap API limits may affect requests.
- The current cache is stored in application memory and is cleared when the application restarts.
- The Comfort Index is a custom heuristic and is not a scientific measurement of human comfort.
- Rankings can change as real-time weather conditions change.
- The city list is maintained through `cities.json`.
- The assignment currently uses a single whitelisted test account.

---

# Bonus Features

The following optional features were implemented:

- Dark mode
- Frontend sorting
- Frontend searching/filtering
- Responsive UI
- UI animations and visual feedback

---

# Project Structure

backend/

    Controllers/
    Data/
    DTOs/
    Models/
    Services/
    Program.cs
    appsettings.json
    backend.csproj

frontend/

    src/
        App.jsx
        App.css
        index.css
        main.jsx

    package.json
    vite.config.js

README.md
.gitignore

---

# Security Notes

- Authentication is handled through Auth0.
- The backend API is protected using JWT Bearer authentication.
- Protected endpoints use `[Authorize]`.
- Public signup is disabled.
- Only whitelisted users can access the application.
- Email verification is required.
- Sensitive API keys should not be committed to GitHub.
- Environment variables should be used for sensitive configuration.
- CORS is restricted to the frontend origin.

---

# Author

Developed for the Fidenz Technologies Trainee Software Engineer Technical Assignment.

Technology:

React + Vite + ASP.NET Core .NET 8 + C# + Auth0 + OpenWeatherMap