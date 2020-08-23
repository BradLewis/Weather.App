using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Weather.App.Models;

namespace Weather.App.Clients
{
    public interface IWeatherClient
    {
        Task<IEnumerable<Station>> GetStationsByName(string name);
        Task<IEnumerable<WeatherEntry>> GetWeatherEntriesForId(int id, DateTime startDate, DateTime endDate);
    }

}