using System.Text.Json.Serialization;

namespace backend.Models
{
    public class OpenWeatherResponse
    {
        public MainWeather Main { get; set; } = new();
        public List<WeatherDescription> Weather { get; set; } = new();
        public WindData Wind { get; set; } = new();
        public CloudData Clouds { get; set; } = new();
        public int Visibility { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Id { get; set; }

    }

    public class MainWeather
    { 
      public double Temp { get; set; }

        [JsonPropertyName("feels_like")]
        public double FeelsLike { get; set; }
        public double Pressure { get; set; }
        public double Humidity { get; set; }

    }

    public class WeatherDescription
    {
        public string Main { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class WindData
    {
      public double Speed { get; set; }
    }

    public class CloudData
    {
        public int All { get; set; }
    }


}
