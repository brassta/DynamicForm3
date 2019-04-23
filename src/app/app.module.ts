import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {UserFormComponent} from './Components/user-form/user-form.component';

@NgModule({
    declarations: [
        AppComponent,
        UserFormComponent
    ],
    imports: [
        BrowserModule, FormsModule, ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}