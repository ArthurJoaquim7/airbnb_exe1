import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';

import { detailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  reservaForm: FormGroup;
  selectedFile: File | null = null;
  editMode = false;
  reservaId: number | null = null;

  // Alocando os arrays dos detalhes
  featureList: string[] = [];
  selectedFeatures: string[] = [];

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private router: Router,
    private route: ActivatedRoute,
    private detailsService: detailsService
  ) {
    this.featureList = this.detailsService.getFeatures();
    this.reservaForm = this.fb.group({
      title: ['', Validators.required],
      where: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: [null],
      features: [[]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.reservaId = +id;
        this.reservaService.getById(this.reservaId).subscribe((reserva) => {
          this.reservaForm.patchValue({
            title: reserva.title,
            where: reserva.where,
            price: reserva.price,
            category: reserva.category,
          });
        });
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // EXECUÇÃO DO SELECT NO DETAIL
  toggleFeature(feature: string) {
    const atual = this.selectedFeatures;
    if (atual.includes(feature)) {
      this.selectedFeatures = atual.filter((f) => f !== feature);
    } else {
      this.selectedFeatures.push(feature);
    }
    this.reservaForm.patchValue({ features: this.selectedFeatures });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.reservaForm.get('title')?.value);
    formData.append('where', this.reservaForm.get('where')?.value);
    formData.append('price', this.reservaForm.get('price')?.value.toString());
    formData.append('category', this.reservaForm.get('category')?.value);
    formData.append('features', JSON.stringify(this.selectedFeatures));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.editMode && this.reservaId !== null) {
      this.reservaService.update(this.reservaId, formData).subscribe(() => {
        alert('Atualizado com sucesso!');

        // == RESETAR APÓS SUBMIT
        this.reservaForm = this.fb.group({
          title: ['', Validators.required],
          where: ['', Validators.required],
          price: [0, [Validators.required, Validators.min(0)]],
          category: ['', Validators.required],
          image: [null],
        });
        this.router.navigate(['/reservas']);
      });
    } else {
      this.reservaService.create(formData).subscribe(() => {
        alert('Criado com sucesso!');

        // == RESETAR APÓS SUBMIT
        this.reservaForm = this.fb.group({
          title: ['', Validators.required],
          where: ['', Validators.required],
          price: [0, [Validators.required, Validators.min(0)]],
          category: ['', Validators.required],
          image: [null],
          features: [[]],
        });
        this.router.navigate(['/reservas']);
      });
    }
    const reservaData = this.reservaForm.value;
    console.log('Dados da reserva:', reservaData);
  }
}
