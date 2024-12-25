import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { Data } from '@angular/router';
import { Subscriber } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  reservas: any[] = [];

  selectedCategory: string = '';
  constructor(
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    // VALIDAÇÃO DO loadReservas
    this.loadReservas();

    // CHAMANDO TODAS AS RESERVAS
    this.reservaService.getAll().subscribe((data) => {
      this.reservas = data;
      console.log(data);
    });
  }

  // CHAMA TODOS
  getAllFunc(): void {
    this.reservaService.getAll().subscribe((data) => {
      this.reservas = data;
      console.log(data);
    });
  }

  // PEGA AS RESERVAS PELA CATEGORIA
  loadReservas(): void {
    this.reservaService.getReservasByCategory(this.selectedCategory).subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        console.error('Erro ao carregar reservas', error);
      }
    );
  }

  // Atualizar reservas ao mudar a categoria
  onCategoryChange(): void {
    this.loadReservas();
  }

  deleteReserva(id: number): void {
    this.reservaService.delete(id).subscribe(() => {
      this.reservas = this.reservas.filter(reserva => reserva.id !== id);
    });
  }
}
