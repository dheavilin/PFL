
export class OrderModel {
    orderNumber: string;
    partnerOrderReference: string;
    orderCustomer: OrderCustomerData;
    items: OrderItemData[];
    shipments: OrderShipmentData[];
}

export class OrderCustomerData {
    firstName: string;
    lastName: string;
    companyName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
    email: string;
    phone: string;
}

export class OrderItemData {
    itemSequenceNumber: number;
    productID: number;
    quantity: number;
    itemFile: string;
    templateData: OrderTemplateData[];
    itemID: number;
}

export class OrderShipmentData {
    shipmentSequenceNumber: number;
    firstName: string;
    lastName: string;
    companyName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
    phone: string;
    shippingMethod: string;
}

export class OrderTemplateData {
    templateDataName: string;
    templateDataValue: string;
}
