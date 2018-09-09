using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;

using PFL.DAL;
using PFL.DAL.Model;

namespace PFL.Service.Controllers
{
    [Route("api/[controller]")]
    public class PFLController : Controller
    {
        //GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        private readonly IOptions<APISettings> _APISettings;

        IConfiguration _iconfiguration;

        public PFLController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }
        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return new PFLRoutines(_iconfiguration).GetSomeValues(id);
        }

        [HttpGet("GetProducts")]
        public Products GetProducts()
        {
            return new PFLRoutines(_iconfiguration).GetProducts();
        }

        [HttpGet("GetAString")]
        public string GetAString()
        {
            return "A String";
        }

        [HttpPost("TestPost")]
        public Products TestPost([FromBody]Products productModel)
        {
            return new PFLRoutines(_iconfiguration).GetProducts();
        }

        [HttpPost("SendOrder")]
        public Orders SendOrder([FromBody]OrderData orderModel)
        {
            return new PFLRoutines(_iconfiguration).SendOrder(orderModel);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
