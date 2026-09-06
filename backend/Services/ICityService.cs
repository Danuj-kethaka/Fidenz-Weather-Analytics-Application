using System.Threading.Tasks;
using backend.Models;

namespace backend.Services
{
    public interface ICityService
    {
        Task<List<City>> GetCitiesAsync();
    }
}