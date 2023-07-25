import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {HttpClientRequest} from "./services/http-client-request.service";
import {AuthService} from "./services/auth-service.service";
import {AppRoutingModule} from "./AppRoutingModule.module";
import {ComponentsModule} from "./components/Components.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, ComponentsModule],
  providers: [HttpClientRequest, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
