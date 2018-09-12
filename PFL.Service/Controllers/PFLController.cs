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
        IConfiguration _iconfiguration;

        public PFLController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        [HttpGet("GetProducts")]
        public Products GetProducts()
        {
            return new PFLRoutines(_iconfiguration).GetProducts();
        }

        [HttpPost("SendOrder")]
        public Orders SendOrder([FromBody]OrderData orderModel)
        {
            return new PFLRoutines(_iconfiguration).SendOrder(orderModel);
        }

    }
}
