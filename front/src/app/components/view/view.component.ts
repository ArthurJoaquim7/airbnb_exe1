import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  reservas: any[] = [];
  reserva: any;

  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reservaService.getById(id).subscribe((data) => {
      console.log(data);
      this.reserva = data;
    });


  }
}
