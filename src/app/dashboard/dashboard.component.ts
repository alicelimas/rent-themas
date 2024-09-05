import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ChartData, ChartOptions } from 'chart.js'; // Importar tipos do chart.js
import { Theme, Rent, Client } from '../interfaces'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalClients: number = 0;
  totalThemes: number = 0;
  totalRents: number = 0;
  totalRevenue: number = 0;
  mostActiveClients: { client: Client, rentCount: number }[] = [];
  mostRentedThemes: { theme: Theme, rentCount: number }[] = []; // Adicione esta variável

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Receita por Mês',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `R$ ${context.raw}`;
          }
        }
      }
    }
  };

  private themePriceMap: Map<number, number> = new Map();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.apiService.getClients().subscribe(clients => {
      this.totalClients = clients.length;
      this.calculateMostActiveClients(clients);
    });

    this.apiService.getThemes().subscribe(themes => {
      this.totalThemes = themes.length;

      // Preencher o mapa de preços dos temas
      this.themePriceMap.clear();
      themes.forEach((theme: Theme) => {
        this.themePriceMap.set(theme.id, theme.price);
      });

      this.apiService.getRents().subscribe(rents => {
        this.totalRents = rents.length;

        // Calcular a receita total usando o mapa de preços dos temas
        this.totalRevenue = rents.reduce((sum: number, rent: Rent) => {
          return sum + (this.themePriceMap.get(rent.theme) || 0);
        }, 0);

        const groupedByMonth = this.groupRentsByMonth(rents);
        this.chartData.labels = Object.keys(groupedByMonth);
        this.chartData.datasets[0].data = Object.values(groupedByMonth);

        this.calculateMostRentedThemes(themes, rents); // Adicione esta linha
      });
    });
  }

  calculateMostActiveClients(clients: Client[]): void {
    this.apiService.getRents().subscribe(rents => {
      // Contar quantos aluguéis cada cliente fez
      const rentCountMap: { [clientId: number]: number } = rents.reduce((map: { [clientId: number]: number }, rent: Rent) => {
        map[rent.client] = (map[rent.client] || 0) + 1;
        return map;
      }, {});

      // Criar lista dos clientes mais ativos
      this.mostActiveClients = clients
        .map(client => ({
          client,
          rentCount: rentCountMap[client.id] || 0
        }))
        .sort((a, b) => b.rentCount - a.rentCount)
        .slice(0, 10); // Exibir apenas os 10 clientes mais ativos
    });
  }

  calculateMostRentedThemes(themes: Theme[], rents: Rent[]): void {
    const rentCountMap: { [themeId: number]: number } = {};

    // Contar o número de aluguéis para cada tema
    rents.forEach(rent => {
      if (rentCountMap[rent.theme]) {
        rentCountMap[rent.theme]++;
      } else {
        rentCountMap[rent.theme] = 1;
      }
    });

    // Criar lista dos temas mais alugados
    this.mostRentedThemes = themes
      .map(theme => ({
        theme,
        rentCount: rentCountMap[theme.id] || 0
      }))
      .sort((a, b) => b.rentCount - a.rentCount)
      .slice(0, 10); // Exibir apenas os 10 temas mais alugados
  }

  groupRentsByMonth(rents: Rent[]): Record<string, number> {
    return rents.reduce((acc: Record<string, number>, rent: Rent) => {
      const date = new Date(rent.date);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      if (!acc[monthYear]) acc[monthYear] = 0;
      acc[monthYear] += (this.themePriceMap.get(rent.theme) || 0);
      return acc;
    }, {});
  }
}
