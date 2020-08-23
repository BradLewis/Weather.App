

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Weather.App.Models;

namespace Weather.App.Clients
{
    public class WeatherApiClient : IWeatherClient
    {
        private readonly string _endpoint;
        private readonly IHttpClientFactory _clientFactory;

        public WeatherApiClient(IConfiguration configuration, IHttpClientFactory clientFactory)
        {

            _endpoint = configuration.GetValue<string>("Endpoints:WeatherApi");
            _clientFactory = clientFactory;
        }

        public async Task<IEnumerable<Station>> GetStationsByName(string name)
        {
            using (var client = _clientFactory.CreateClient())
            {
                var endpoint = $"{_endpoint}/station/name/{name}";
                var request = new HttpRequestMessage(HttpMethod.Get, endpoint);
                var response = await client.SendAsync(request).ConfigureAwait(false);
                var responseStream = await response.Content.ReadAsStreamAsync();
                var result = await JsonSerializer.DeserializeAsync<List<Station>>(responseStream);
                return result;
            }
        }

        public Task<IEnumerable<WeatherEntry>> GetWeatherEntriesForId(int id, DateTime startDate, DateTime endDate)
        {
            throw new NotImplementedException();
        }
    }
}