import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { PFLComponent } from './components/PFL/pfl.component';

import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { SpinnerModule } from 'primeng/spinner';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        PFLComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AccordionModule,
        PanelModule,
        ButtonModule,
        RadioButtonModule,
        TableModule,
        BrowserAnimationsModule,
        InputTextModule,
        FieldsetModule,
        CheckboxModule,
        SpinnerModule,
        DropdownModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'pfl', pathMatch: 'full' },
            { path: 'pfl', component: PFLComponent },
            { path: '**', redirectTo: 'pfl' }
        ])
    ]
})
export class AppModuleShared {
}
