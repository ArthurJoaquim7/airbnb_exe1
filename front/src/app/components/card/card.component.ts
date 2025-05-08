import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { FilterService } from '../../services/filter.service'; // importe o novo serviço

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  reservas: any[] = [];
  selectedCategory: string = '';

  constructor(
    private reservaService: ReservaService,
    private filterService: FilterService // APLICANDO O SERVIÇO
  ) {}

  ngOnInit(): void {
    this.getAllFunc();

    // Escuta a mudança de categoria vinda do FilterComponent
    this.filterService.selectedCategory$.subscribe((category) => {
      this.selectedCategory = category;
      if (category) {
        this.loadReservas();
      } else {
        this.getAllFunc();
      }
    });
  }

  loadReservas(): void {
    this.reservaService.getReservasByCategory(this.selectedCategory).subscribe(
      (data) => (this.reservas = data),
      (error) => console.error('Erro ao carregar reservas', error)
    );
  }

  getAllFunc(): void {
    this.reservaService.getAll().subscribe((data) => {
      this.reservas = data;
    });
  }

  deleteReserva(id: number): void {
    this.reservaService.delete(id).subscribe(() => {
      this.reservas = this.reservas.filter((reserva) => reserva.id !== id);
    });
  }
}
