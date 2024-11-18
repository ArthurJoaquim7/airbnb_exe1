import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  reservas: any[] = [];

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
      this.reservaService.getAll().subscribe((data) => {
          this.reservas = data;
      });
  }

}
