import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaService } from './pwa.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    HomepageComponent,
    ContactListComponent,
    BarcodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BarecodeScannerLivestreamModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    PwaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
