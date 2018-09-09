import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { SpinnerModule } from 'primeng/spinner';

import { OnInit, Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ProductModel, Datum } from '../../Model/product.model';
import { OrderModel, OrderCustomerData, OrderItemData, OrderShipmentData } from '../../Model/order.model';

@Component({
    selector: 'pfl',
    templateUrl: './pfl.component.html',

})
export class PFLComponent implements OnInit{

    products: ProductModel;
    httpObj: Http;
    selectedProduct: Datum | null;
    cols: any[];
    showOrderDetails: boolean = false;
    orderModel: OrderModel = new OrderModel();
    orderCustomerData: OrderCustomerData = new OrderCustomerData();
    orderShipmentData: OrderShipmentData = new OrderShipmentData();
    orderItemData: OrderItemData = new OrderItemData();
    shippingSameChecked: boolean = false;
    showResult: boolean = false;
    resultMessage: string = "";

    constructor(http: Http) {
        this.httpObj = http;

        this.httpObj.get('http://localhost/PFL.Service/api/PFL/GetProducts')
            .map(res => <ProductModel>res.json())
            .subscribe(
            result => {
                this.products = result;
            },
            error => console.error(error));
    }

    ngOnInit() {
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'productID', header: 'Product ID' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' }
        ];

    }

    buildOrder() {
        this.orderCustomerData = new OrderCustomerData();
        this.orderShipmentData = new OrderShipmentData();
        this.orderItemData = new OrderItemData();

        this.showOrderDetails = true;
        this.showResult = false;
        this.resultMessage = "";
    }

    sendOrder() {
        var orderModel: OrderModel = new OrderModel();

        var customer = new OrderCustomerData();
        customer.firstName = "Doug";
        customer.lastName = "Heavilin";
        customer.companyName = "Company";
        customer.address1 = "address1";
        customer.city = "Franklin";
        customer.state = "IN";
        customer.postalCode = "46131";
        customer.countryCode = "US";
        customer.email = "notreal@gmail.com";
        customer.phone = "1111111111";

        let orderItems: OrderItemData[] = [];

        var orderItem = new OrderItemData();
        orderItem.itemSequenceNumber = 1;
        orderItem.productID = 9885;
        orderItem.quantity = 2000;
        orderItem.itemFile = "https://drive.google.com/file/d/1O_AoVvKXhm5nuQT1a1ofpcQzNP8Jj9u9/view";

        orderItems.push(orderItem);

        let orderShipments: OrderShipmentData[] = [];

        var orderShipment = new OrderShipmentData();
        orderShipment.shipmentSequenceNumber = 1;
        orderShipment.firstName = "Doug";
        orderShipment.lastName = "Heavilin";
        orderShipment.companyName = "Company";
        orderShipment.address1 = "address1";
        orderShipment.city = "Franklin";
        orderShipment.state = "IN";
        orderShipment.postalCode = "46131";
        orderShipment.countryCode = "US";
        orderShipment.phone = "1111111111";
        orderShipment.shippingMethod = "FDXG";

        orderShipments.push(orderShipment);

        orderModel.partnerOrderReference = "44445";
        orderModel.orderCustomer = customer;
        orderModel.items = orderItems;
        orderModel.shipments = orderShipments;

        var requestHeader = new Headers();
        requestHeader.append('Content-Type', 'application / json');

        this.httpObj.post('http://localhost/PFL.Service/api/PFL/SendOrder', orderModel ? JSON.stringify(orderModel) : null, { headers: requestHeader })
            .map(res => res.json())
            .subscribe(
            result => {
                this.products = result;
            },
            error => console.error(error));
    }

    selectRow() {
        this.showOrderDetails = false;
        this.showResult = false;
        this.resultMessage = "";
    }

    unselectRow() {
        this.showOrderDetails = false;
        this.selectedProduct = null;
        this.showResult = false;
        this.resultMessage = "";
  }

    onSubmit() {

        //this.orderModel.partnerOrderReference = "44444";
        this.orderCustomerData.countryCode = "US";
        this.orderShipmentData.countryCode = "US";
        this.orderModel.orderCustomer = this.orderCustomerData;

        if (this.shippingSameChecked) {
            this.orderShipmentData.firstName = this.orderCustomerData.firstName;
            this.orderShipmentData.lastName = this.orderCustomerData.lastName;
            this.orderShipmentData.companyName = this.orderCustomerData.companyName;
            this.orderShipmentData.address1 = this.orderCustomerData.address1;
            this.orderShipmentData.address2 = this.orderCustomerData.address2;
            this.orderShipmentData.city = this.orderCustomerData.city;
            this.orderShipmentData.state = this.orderCustomerData.state;
            this.orderShipmentData.postalCode = this.orderCustomerData.postalCode;
            this.orderShipmentData.countryCode = this.orderCustomerData.countryCode;
            this.orderShipmentData.phone = this.orderCustomerData.phone;
        }

        if (this.selectedProduct) {
            this.orderItemData.productID = this.selectedProduct.productID;
        }
        else {
            console.log("this.selectedProduct is null");
            return;
        }
        this.orderModel.items = [];
        this.orderItemData.itemSequenceNumber = 1;

        this.orderModel.items.push(this.orderItemData);

        this.orderModel.shipments = [];
        this.orderShipmentData.shipmentSequenceNumber = 1;
        this.orderShipmentData.shippingMethod = "FDXG";

        this.orderModel.shipments.push(this.orderShipmentData);

        var requestHeader = new Headers();
        requestHeader.append('Content-Type', 'application / json');

        this.httpObj.post('http://localhost/PFL.Service/api/PFL/SendOrder', this.orderModel ? JSON.stringify(this.orderModel) : null, { headers: requestHeader })
            .map(res => res.json())
            .subscribe(
                result => {
                    this.orderModel = result.results.data;

                    this.resultMessage = "Your order has been placed successfully.  Your Order Number is #" + this.orderModel.orderNumber;
                    this.showResult = true;
                },
                error => console.log(error));

    }
}
