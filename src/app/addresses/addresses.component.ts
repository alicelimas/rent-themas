import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/addresses.service';
import { Address } from '../interfaces';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddress: Address | null = null;
  isCreating: boolean = false;
  formAddress: Address = { id: 0, street: '', number: 0, complement: '', district: '', city: '', state: '' };

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  selectAddress(address: Address): void {
    this.selectedAddress = { ...address };
    this.formAddress = { ...address };
    this.isCreating = false;
  }

  createAddress(): void {
    this.addressService.createAddress(this.formAddress).subscribe(() => {
      this.loadAddresses();
      this.formAddress = { id: 0, street: '', number: 0, complement: '', district: '', city: '', state: '' };
      this.isCreating = false;
    });
  }

  updateAddress(): void {
    if (this.selectedAddress && this.selectedAddress.id) {
      this.addressService.updateAddress(this.selectedAddress.id, this.formAddress).subscribe(() => {
        this.loadAddresses();
        this.selectedAddress = null;
        this.formAddress = { id: 0, street: '', number: 0, complement: '', district: '', city: '', state: '' };
      });
    }
  }

  deleteAddress(id: number): void {
    this.addressService.deleteAddress(id).subscribe(() => {
      this.loadAddresses();
      this.selectedAddress = null;
    });
  }

  onSubmit(): void {
    if (this.selectedAddress) {
      this.updateAddress();
    } else {
      this.createAddress();
    }
  }

  cancel(): void {
    this.selectedAddress = null;
    this.isCreating = false;
    this.formAddress = { id: 0, street: '', number: 0, complement: '', district: '', city: '', state: '' };
  }

  startCreating(): void {
    this.isCreating = true;
    this.selectedAddress = null;
    this.formAddress = { id: 0, street: '', number: 0, complement: '', district: '', city: '', state: '' };
  }
}
