using System;
using System.Collections.Generic;
using System.Text;

namespace PFL.DAL.Model
{

    public class Orders
    {
        public Meta meta { get; set; }
        public OrderResults results { get; set; }
    }

    public class OrderResults
    {
        public List<object> errors { get; set; }
        public List<object> messages { get; set; }
        public OrderData data { get; set; }
    }

    public class OrderData
    {
        public string OrderNumber { get; set; }
        public string PartnerOrderReference { get; set; }
        public OrderCustomerData OrderCustomer { get; set; }
        public List<OrderItemData> Items { get; set; }
        public List<OrderShipmentData> Shipments { get; set; }
    }

    public class OrderCustomerData
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string CountryCode { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }

    public class OrderItemData
    {
        public short ItemSequenceNumber { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public string ItemFile { get; set; }
        public List<OrderTemplateData> TemplateData { get; set; }
        public long ItemID { get; set; }
    }

    public class OrderShipmentData
    {
        public short ShipmentSequenceNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string CountryCode { get; set; }
        public string Phone { get; set; }
        public string ShippingMethod { get; set; }
    }

    public class OrderTemplateData
    {
        public string TemplateDataName { get; set; }
        public string TemplateDataValue { get; set; }
    }

}
