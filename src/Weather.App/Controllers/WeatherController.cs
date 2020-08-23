using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Weather.App.Clients;
using Weather.App.Models;

namespace Weather.App.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherController : ControllerBase
    {

        private readonly ILogger<WeatherController> _logger;
        private readonly IWeatherClient _client;

        public WeatherController(ILogger<WeatherController> logger, IWeatherClient weatherClient)
        {
            _logger = logger;
            _client = weatherClient;
        }

        [HttpGet("station/name/{name}")]
        public async Task<IEnumerable<Station>> GetStationByName(string name)
        {
            try
            {
                return await _client.GetStationsByName(name);
            }
            catch (Exception e)
            {
                _logger.LogError("Error occurred getting station by name. {exception}, {name}", e, name);
                return new List<Station>();
            }
        }
    }
}
