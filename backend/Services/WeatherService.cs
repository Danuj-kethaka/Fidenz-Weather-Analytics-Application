using System.Net.Http.Json;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace backend.Services
{
    public class WeatherService : IweatherService
    { 
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;

        private const string BaseUrl = "https://api.openweathermap.org/data/2.5/weather";

        private const int CacheDurationMinutes = 5;

        public WeatherService(HttpClient httpClient, IConfiguration configuration, IMemoryCache memoryCache)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _memoryCache = memoryCache;
        }

        public async Task<OpenWeatherResponse> GetWeatherAsync(string cityCode)
        {
            string cachekey = $"weather_{cityCode}";

            // check if weather data already exists in cache
            if(_memoryCache.TryGetValue(cachekey, out OpenWeatherResponse? cachedWeather))
            {
                return cachedWeather!;
            }

            var apikey = _configuration["OpenWeather:ApiKey"];

            if(string.IsNullOrWhiteSpace(apikey))
            {
                throw new InvalidOperationException("Openweather API key is not configures.");
            }

            var url = $"{BaseUrl}?id={cityCode}&appid={apikey}&units=metric";

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                var errorMessage = await response.Content.ReadAsStringAsync();

                throw new HttpRequestException($"OpenWeatherMap request failed. " + $"Status: {response.StatusCode}." + $"Response: {errorMessage}");
            }

            var weather = await response.Content.ReadFromJsonAsync<OpenWeatherResponse>();

            if(weather == null)
            {
                throw new InvalidOperationException("Unable to read weather data from OpenWeatherMap");
            }

            //store weather reponse in cache for 5 minutes
            var cacheOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(CacheDurationMinutes)

            };

            _memoryCache.Set(cachekey, weather, cacheOptions);

            return weather;

        }

        public bool IsWeatherCached(string cityCode)
        {
            string cacheKey = $"weather_{cityCode}";

            return _memoryCache.TryGetValue(cacheKey, out _);
        }

    }
}
