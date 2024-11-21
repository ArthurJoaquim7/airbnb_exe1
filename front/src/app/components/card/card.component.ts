import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
// import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  reservas: any[] = [];
  constructor(
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    this.reservaService.getAll().subscribe((data) => {
      this.reservas = data;
      console.log(data);
    });
  }

  deleteReserva(id: number): void {
    this.reservaService.delete(id).subscribe(() => {
      this.reservas = this.reservas.filter(reserva => reserva.id !== id);
    });
  }
}
