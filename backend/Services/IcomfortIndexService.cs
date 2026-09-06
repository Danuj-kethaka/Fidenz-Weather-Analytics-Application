using backend.Models;

namespace backend.Services
{
    public interface IcomfortIndexService
    {
        double CalculateComfortIndex(OpenWeatherResponse weather);
    }
}
