import { BarcodeComponent } from './barcode/barcode.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LocationComponent } from './location/location.component';
import { ContactListComponent } from './contact-list/contact-list.component';



const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'location', component: LocationComponent },
  { path: 'contact', component: ContactListComponent },
  { path: 'barcode', component: BarcodeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
