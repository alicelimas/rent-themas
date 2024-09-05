import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/items.service';
import { Item } from '../interfaces';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  selectedItem: Item | null = null;
  isCreating: boolean = false;
  formItem: Item = { id: 0, name: '', description: '' }; // Adapte conforme necessário

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  selectItem(item: Item): void {
    this.selectedItem = { ...item };
    this.formItem = { ...item }; // Preenche o formulário com os dados do item selecionado
    this.isCreating = false;
  }

  createItem(): void {
    this.itemService.createItem(this.formItem).subscribe(() => {
      this.loadItems();
      this.formItem = { id: 0, name: '', description: '' };
      this.isCreating = false;
    });
  }

  updateItem(): void {
    if (this.selectedItem && this.selectedItem.id) {
      this.itemService.updateItem(this.selectedItem.id, this.formItem).subscribe(() => {
        this.loadItems();
        this.selectedItem = null;
        this.formItem = { id: 0, name: '', description: '' };
      });
    }
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.loadItems();
      this.selectedItem = null;
    });
  }

  onSubmit(): void {
    if (this.selectedItem) {
      this.updateItem();
    } else {
      this.createItem();
    }
  }

  cancel(): void {
    this.selectedItem = null;
    this.isCreating = false;
    this.formItem = { id: 0, name: '', description: '' };
  }

  startCreating(): void {
    this.isCreating = true;
    this.selectedItem = null;
    this.formItem = { id: 0, name: '', description: '' }; // Reinicializa o formulário para criação
  }
}
