using System;
using System.Collections.Generic;
using System.Text;

namespace PFL.DAL.Model
{
    public class Products
    {
        public Meta meta { get; set; }
        public ProductResults results { get; set; }
    }
    
    public class DeliveredPrice
    {
        public string deliveryMethodCode { get; set; }
        public string description { get; set; }
        public double price { get; set; }
        public string country { get; set; }
        public string countryCode { get; set; }
        public DateTime created { get; set; }
        public string locationType { get; set; }
        public bool isDefault { get; set; }
    }

    public class ProductionSpeed
    {
        public int days { get; set; }
        public bool isDefault { get; set; }
    }

    public class Datum
    {
        public int id { get; set; }
        public string sku { get; set; }
        public int productID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string imageURL { get; set; }
        public List<object> images { get; set; }
        public int quantityDefault { get; set; }
        public int? quantityMinimum { get; set; }
        public int? quantityMaximum { get; set; }
        public int? quantityIncrement { get; set; }
        public string shippingMethodDefault { get; set; }
        public bool hasTemplate { get; set; }
        public object emailTemplateId { get; set; }
        public DateTime lastUpdated { get; set; }
        public List<object> customValues { get; set; }
        public List<DeliveredPrice> deliveredPrices { get; set; }
        public List<ProductionSpeed> productionSpeeds { get; set; }
        public string productFormat { get; set; }
        public object productRestrictionType { get; set; }
    }

    public class ProductResults
    {
        public List<object> errors { get; set; }
        public List<object> messages { get; set; }
        public List<Datum> data { get; set; }
    }

}
