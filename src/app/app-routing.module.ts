import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './clients/clients.component';
import { ThemesComponent } from './themes/themes.component';
import { ItemsComponent } from './items/items.component';
import { RentsComponent } from './rents/rents.component';
import { AddressesComponent } from './addresses/addresses.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'themes', component: ThemesComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'rents', component: RentsComponent },
  { path: 'addresses', component: AddressesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
