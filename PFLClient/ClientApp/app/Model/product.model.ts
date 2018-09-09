
    export interface ProductModel {
        meta: Meta;
        results: Results;
    }

    export interface Meta {
        time: string;
        statusCode: number;
        duration: number;
    }

    export interface Image {
        url: string;
        width: number;
        height: number;
        type: string;
    }

    export interface DeliveredPrice {
        deliveryMethodCode: string;
        description: string;
        price: number;
        country: string;
        countryCode: string;
        created: Date;
        locationType: string;
        isDefault: boolean;
    }

    export interface ProductionSpeed {
        days: number;
        isDefault: boolean;
    }

    export interface Datum {
        id: number;
        sku: string;
        productID: number;
        name: string;
        description: string;
        imageURL: string;
        images: Image[];
        quantityDefault: number;
        quantityMinimum?: number;
        quantityMaximum?: number;
        quantityIncrement?: number;
        shippingMethodDefault: string;
        hasTemplate: boolean;
        emailTemplateId?: any;
        lastUpdated: Date;
        customValues: any[];
        deliveredPrices: DeliveredPrice[];
        productionSpeeds: ProductionSpeed[];
        productFormat: string;
        productRestrictionType?: any;
    }

    export interface Results {
        errors: any[];
        messages: any[];
        data: Datum[];
    }


