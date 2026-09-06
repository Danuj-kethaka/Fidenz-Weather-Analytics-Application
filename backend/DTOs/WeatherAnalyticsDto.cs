namespace backend.DTOs
{
    public class WeatherAnalyticsDto
    {
        public string CityName { get; set; } = string.Empty;

        public double Temperature { get; set; }

        public double FeelsLike { get; set; }

        public double Humidity { get; set;  }

        public double WindSpeed { get; set; }

        public int Cloudiness { get; set; }

        public double ComfortIndex { get; set; }

        public int Rank { get; set; }
    }
}
