import { Component, OnInit } from '@angular/core';
import { RentService } from '../services/rents.service';
import { ClientService } from '../services/clients.service';
import { ThemeService } from '../services/themes.service';
import { AddressService } from '../services/addresses.service';
import { Rent, Client, Theme, Address } from '../interfaces';

@Component({
  selector: 'app-rent',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css']
})
export class RentsComponent implements OnInit {
  rents: Rent[] = [];
  clients: Client[] = [];
  themes: Theme[] = [];
  addresses: Address[] = [];
  selectedRent: Rent | null = null;
  isCreating: boolean = false;
  formRent: Rent = { id: 0, date: '', start_hours: '', end_hours: '', client: 0, theme: 0, address: 0 };

  constructor(
    private rentService: RentService,
    private clientService: ClientService,
    private themeService: ThemeService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.loadRents();
    this.loadClients();
    this.loadThemes();
    this.loadAddresses();
  }

  loadRents(): void {
    this.rentService.getRents().subscribe(rents => {
      this.rents = rents;
    });
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes;
    });
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  selectRent(rent: Rent): void {
    this.selectedRent = { ...rent };
    this.formRent = { ...rent };
    this.isCreating = false;
  }

  createRent(): void {
    this.rentService.createRent(this.formRent).subscribe(() => {
      this.loadRents();
      this.formRent = { id: 0, date: '', start_hours: '', end_hours: '', client: 0, theme: 0, address: 0 };
      this.isCreating = false;
    });
  }

  updateRent(): void {
    if (this.selectedRent && this.selectedRent.id) {
      this.rentService.updateRent(this.selectedRent.id, this.formRent).subscribe(() => {
        this.loadRents();
        this.selectedRent = null;
        this.formRent = { id: 0, date: '', start_hours: '', end_hours: '', client: 0, theme: 0, address: 0 };
      });
    }
  }

  deleteRent(id: number): void {
    this.rentService.deleteRent(id).subscribe(() => {
      this.loadRents();
      this.selectedRent = null;
    });
  }

  onSubmit(): void {
    if (this.selectedRent) {
      this.updateRent();
    } else {
      this.createRent();
    }
  }

  cancel(): void {
    this.selectedRent = null;
    this.isCreating = false;
    this.formRent = { id: 0, date: '', start_hours: '', end_hours: '', client: 0, theme: 0, address: 0 };
  }

  startCreating(): void {
    this.isCreating = true;
    this.selectedRent = null;
    this.formRent = { id: 0, date: '', start_hours: '', end_hours: '', client: 0, theme: 0, address: 0 };
  }

  getClientName(clientId: number): string {
    return this.clients.find(client => client.id === clientId)?.name || 'N/A';
  }

  getThemeName(themeId: number): string {
    return this.themes.find(theme => theme.id === themeId)?.name || 'N/A';
  }

  getAddressStreet(addressId: number): string {
    return this.addresses.find(address => address.id === addressId)?.street || 'N/A';
  }
}
