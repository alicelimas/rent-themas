import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/clients.service';
import { Client } from '../interfaces';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  isCreating: boolean = false;
  formClient: Client = { id: 0, name: '', email: '' }; // Adapte o modelo conforme necessário

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  selectClient(client: Client): void {
    this.selectedClient = { ...client };
    this.formClient = { ...client }; // Preenche o formulário com os dados do cliente selecionado
    this.isCreating = false;
  }

  createClient(): void {
    this.clientService.createClient(this.formClient).subscribe(() => {
      this.loadClients();
      this.resetForm();
    });
  }

  updateClient(): void {
    if (this.selectedClient?.id) {
      this.clientService.updateClient(this.selectedClient.id, this.formClient).subscribe(() => {
        this.loadClients();
        this.resetForm();
      });
    }
  }

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(() => {
      this.loadClients();
      this.resetForm();
    });
  }

  onSubmit(): void {
    if (this.selectedClient) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }

  cancel(): void {
    this.resetForm();
  }

  startCreating(): void {
    this.isCreating = true;
    this.selectedClient = null;
    this.formClient = { id: 0, name: '', email: '' }; // Reinicializa o formulário para criação
  }

  private resetForm(): void {
    this.selectedClient = null;
    this.isCreating = false;
    this.formClient = { id: 0, name: '', email: '' }; // Limpa o formulário
  }
}
