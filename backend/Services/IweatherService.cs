using backend.Models;

namespace backend.Services
{
    public interface IweatherService
    {
        Task<OpenWeatherResponse> GetWeatherAsync(string cityCode);

        bool IsWeatherCached(string cityCode);
    }
}
