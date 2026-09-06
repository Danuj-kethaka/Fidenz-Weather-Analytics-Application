using backend.Models;

namespace backend.Services
{
    public class ComfortIndexService : IcomfortIndexService
    {
        public double CalculateComfortIndex(OpenWeatherResponse weather)
        {
            double temperatureScore = CalculateTemperatureScore(weather.Main.Temp);

            double humidityScore = CalculateHumidityScore(weather.Main.Humidity);

            double windScore = CalculateWindScore(weather.Wind.Speed);

            double cloudoinessScore = CalculateCloudinessScore(weather.Clouds.All);

            double comfortIndex = (temperatureScore * 0.40) + (humidityScore * 0.25) + (windScore * 0.20) + (cloudoinessScore * 0.15);

            return Math.Round(comfortIndex, 2);
        }

        private double CalculateTemperatureScore(double temperature)
        {
            double difference = Math.Abs(temperature - 22);

            double score = 100 - (difference * 5);

            return Math.Clamp(score, 0, 100);
        }

        private double CalculateHumidityScore(double humidity)
        {
            double difference = Math.Abs(humidity - 50);

            double score = 100 - (difference * 2);

            return Math.Clamp(score, 0, 100);
        }

        private double CalculateWindScore(double windSpeed)
        {
            double difference = Math.Abs(windSpeed - 2);

            double score = 100 - (difference * 20);

            return Math.Clamp(score, 0, 100);
        }

        private double CalculateCloudinessScore(double cloudiness)
        {
            double difference = Math.Abs(cloudiness - 30);

            double score = 100 - difference;

            return Math.Clamp(score, 0, 100);
        }
    }
}
