using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services
{
    public class CityService : ICityService
    {
        private readonly IWebHostEnvironment _environment;

        public CityService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<List<City>> GetCitiesAsync()
        {
            var filePath = Path.Combine(
                _environment.ContentRootPath,
                "Data",
                "cities.json"
            );

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException(
                    "cities.json file was not found.",
                    filePath
                );
            }

            var json = await File.ReadAllTextAsync(filePath);

            var cityList = JsonSerializer.Deserialize<CityList>(
                json,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }
            );

            if (cityList == null || cityList.List == null)
            {
                throw new InvalidOperationException(
                    "Unable to read city data from cities.json."
                );
            }

            return cityList.List;
        }
    }
}