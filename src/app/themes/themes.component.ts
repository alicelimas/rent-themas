import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/themes.service';
import { ItemService } from '../services/items.service';
import { Theme, Item } from '../interfaces';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  themes: Theme[] = [];
  items: Item[] = []; // Lista de itens
  selectedTheme: Theme | null = null;
  isCreating: boolean = false;
  formTheme: Theme = { id: 0, name: '', color: '', price: 0, itens: [] }; // Inicialização

  constructor(private themeService: ThemeService, private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadThemes();
    this.loadItems(); // Carregar itens disponíveis
  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes;
    });
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  selectTheme(theme: Theme): void {
    this.selectedTheme = { ...theme };
    this.formTheme = { ...theme };
    this.isCreating = false;
  }

  createTheme(): void {
    this.themeService.createTheme(this.formTheme).subscribe(() => {
      this.loadThemes();
      this.formTheme = { id: 0, name: '', color: '', price: 0, itens: [] };
      this.isCreating = false;
    });
  }

  updateTheme(): void {
    if (this.selectedTheme && this.selectedTheme.id) {
      this.themeService.updateTheme(this.selectedTheme.id, this.formTheme).subscribe(() => {
        this.loadThemes();
        this.selectedTheme = null;
        this.formTheme = { id: 0, name: '', color: '', price: 0, itens: [] };
      });
    }
  }

  deleteTheme(id: number): void {
    this.themeService.deleteTheme(id).subscribe(() => {
      this.loadThemes();
      this.selectedTheme = null;
    });
  }

  onSubmit(): void {
    if (this.selectedTheme) {
      this.updateTheme();
    } else {
      this.createTheme();
    }
  }

  cancel(): void {
    this.selectedTheme = null;
    this.isCreating = false;
    this.formTheme = { id: 0, name: '', color: '', price: 0, itens: [] };
  }

  startCreating(): void {
    this.isCreating = true;
    this.selectedTheme = null;
    this.formTheme = { id: 0, name: '', color: '', price: 0, itens: [] };
  }
}
