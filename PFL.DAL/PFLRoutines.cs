using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;

using PFL.DAL.Model;

namespace PFL.DAL
{

    public class PFLRoutines
    {
        private IConfiguration _iconfiguration;

        public PFLRoutines(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        public Products GetProducts()
        {
            using (HttpClient client = InitializeHttpClient())
            {
                try
                {
                    HttpResponseMessage response = client.GetAsync(string.Format("/products?apikey={0}", GetAPIKey())).Result;

                    var jsonResponse = response.Content.ReadAsStringAsync();

                    var products = Newtonsoft.Json.JsonConvert.DeserializeObject<Products>(jsonResponse.Result);

                    return products;
                }
                catch
                {
                    // In a real world situation, I'd have exception logging
                    throw;
                }
            }
        }

        public Orders SendOrder(OrderData orderModel)
        {
            using (HttpClient client = InitializeHttpClient())
            {
                try
                {
                    // In a real world situation, I'd log both the orderModel we're sending, and the response we get back

                    var serializedOrder = Newtonsoft.Json.JsonConvert.SerializeObject(orderModel);
                    var content = new StringContent(serializedOrder);
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                    HttpResponseMessage response = client.PostAsync(string.Format("/orders?apikey={0}", GetAPIKey()), content).Result;

                    var jsonResponse = response.Content.ReadAsStringAsync();

                    var orderModelResult = Newtonsoft.Json.JsonConvert.DeserializeObject<Orders>(jsonResponse.Result);

                    return orderModelResult;
                }
                catch
                {
                    // In a real world situation, I'd have exception logging
                    throw;
                }
            }
        }

        private HttpClient InitializeHttpClient()
        {
            HttpClient client = new HttpClient();

            string baseAddress = _iconfiguration.GetSection("API").GetSection("baseAddress").Value;
            string apiUsername = _iconfiguration.GetSection("API").GetSection("apiUsername").Value;
            string apiPassword = _iconfiguration.GetSection("API").GetSection("apiPassword").Value;

            client.BaseAddress = new Uri(baseAddress);

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(
                string.Format("{0}:{1}", apiUsername, apiPassword))));

            return client;
        }

        private string GetAPIKey()
        {
            return _iconfiguration.GetSection("API").GetSection("apiKey").Value;
        }
    }
}
