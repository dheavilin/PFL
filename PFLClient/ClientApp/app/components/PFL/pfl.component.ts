import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { SpinnerModule } from 'primeng/spinner';
import { DropdownModule } from 'primeng/dropdown';

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
    showOrderDetails: boolean = false;
    orderModel: OrderModel = new OrderModel();
    orderCustomerData: OrderCustomerData = new OrderCustomerData();
    orderShipmentData: OrderShipmentData = new OrderShipmentData();
    orderItemData: OrderItemData = new OrderItemData();
    shippingSameChecked: boolean = false;
    showResult: boolean = false;
    resultMessage: string = "";
    availableShipping: DropDownValue[] = [];
    selectedShipping: DropDownValue;

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

    }

    buildOrder() {
        this.orderCustomerData = new OrderCustomerData();
        this.orderShipmentData = new OrderShipmentData();
        this.orderItemData = new OrderItemData();
        this.orderModel.partnerOrderReference = "";
        this.shippingSameChecked = false;

        this.availableShipping = [];

        this.availableShipping.push(new DropDownValue("Select", ""));

        if (this.selectedProduct) {
            this.selectedProduct.deliveredPrices.forEach(price => this.availableShipping.push(new DropDownValue(price.description, price.deliveryMethodCode)));
        }

        this.showOrderDetails = true;
        this.showResult = false;
        this.resultMessage = "";
    }

    selectRow() {
        // Show the product detail panel for the selected product
        this.showOrderDetails = false;
        this.showResult = false;
        this.resultMessage = "";
    }

    unselectRow() {
        // Hide the product detail panel
        this.showOrderDetails = false;
        this.selectedProduct = null;
        this.showResult = false;
        this.resultMessage = "";
  }

    onSubmit() {
        // Build the full order model based on the input values, and send it off to the ordering API
        
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
        this.orderShipmentData.shippingMethod = this.selectedShipping.code;

        this.orderModel.shipments.push(this.orderShipmentData);

        var requestHeader = new Headers();
        requestHeader.append('Content-Type', 'application / json');

        this.httpObj.post('http://localhost/PFL.Service/api/PFL/SendOrder', this.orderModel ? JSON.stringify(this.orderModel) : null, { headers: requestHeader })
            .map(res => res.json())
            .subscribe(
                result => {
                    this.orderModel = result.results.data;

                    // if we're successful, show the order number to the user
                    this.resultMessage = "Your order has been placed successfully.  Your Order Number is " + this.orderModel.orderNumber;
                    this.showResult = true;
                },
                error => console.log(error));

    }
}

class DropDownValue {
    name: string;
    code: string;

    constructor(public Name: string, public Code: string) {
        this.name = Name;
        this.code = Code;
    }
}
