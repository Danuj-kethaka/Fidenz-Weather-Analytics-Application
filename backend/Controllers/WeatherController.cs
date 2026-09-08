using backend.Models;
using backend.Services;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/weather")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly IweatherService _weatherService;
        private readonly ICityService _cityService;
        private readonly IcomfortIndexService _comfortIndexService;

        public WeatherController(IweatherService weatherService, ICityService cityService, IcomfortIndexService comfortIndexService)
        {
            _weatherService = weatherService;
            _cityService = cityService;
            _comfortIndexService = comfortIndexService;
        }

        // GET: api/weather/{cityCode}
        [HttpGet("{cityCode}")]
        public async Task<ActionResult<OpenWeatherResponse>> GetWeather(string cityCode)
        {
            try
            {
                var weather = await _weatherService.GetWeatherAsync(cityCode);
                return Ok(weather);
            }

            catch (HttpRequestException ex)
            {
                return StatusCode(StatusCodes.Status502BadGateway,
                    new
                    {
                        message = "Unable to retrieve weather data.",
                        error = ex.Message
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new
                    {
                        message = "An unexpected error occured.",
                        error = ex.Message
                    });
            }
        }

        // GET: api/weather
        [HttpGet]
        public async Task<IActionResult> GetAllWeather()
        {
            try
            {
                var cities = await _cityService.GetCitiesAsync();

                var weatherResults = new List<WeatherAnalyticsDto>();

                foreach (var city in cities)
                {
                    try
                    {
                        var weather = await _weatherService.GetWeatherAsync(city.CityCode);

                        var comfortIndex = _comfortIndexService.CalculateComfortIndex(weather);

                        var result = new WeatherAnalyticsDto
                        {
                            CityName = city.CityName,
                            WeatherDescription = weather.Weather.Count > 0
                            ? weather.Weather[0].Description
                            : "Unknown",
                            Temperature = weather.Main.Temp,
                            FeelsLike = weather.Main.FeelsLike,
                            Humidity = weather.Main.Humidity,
                            WindSpeed = weather.Wind.Speed,
                            Cloudiness = weather.Clouds.All,
                            ComfortIndex = comfortIndex
                        };

                        weatherResults.Add(result);

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Failed to retrieve weather for {city.CityName}: {ex.Message}");
                    }
                }

                var rankedResults = weatherResults.OrderByDescending(x => x.ComfortIndex).ToList();

                for (int i = 0; i<rankedResults.Count; i++)
                {
                    rankedResults[i].Rank = i + 1;
                }

                return Ok(rankedResults);
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "Unable to process city weather data.",
                    error = ex.Message
                });
            }
        }

        //GET : api/weather/cache/{cityCode}
        [HttpGet("cache/{cityCode}")]
        public IActionResult GetCacheStatus(string cityCode)
        {
            bool isCached = _weatherService.IsWeatherCached(cityCode);

            return Ok(new
            {
                cityCode = cityCode,
                status = isCached ? "HIT" : "MISS",
                cachedFor = "5 minutes"
            });
        }

    }
}