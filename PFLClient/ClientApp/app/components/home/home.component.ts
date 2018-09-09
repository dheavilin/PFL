import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    someValues: string = "Yo";

    //constructor(http: Http) {
    //    http.get('http://localhost/PFL.Service/api/PFL/4').subscribe(
    //        result => {
    //            this.someValues = result.json() as string;
    //        },
    //        error => console.error(error));
    //}


}
