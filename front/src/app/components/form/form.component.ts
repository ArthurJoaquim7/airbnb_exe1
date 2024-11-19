import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    reservaForm: FormGroup;
    selectedFile: File | null = null;
    editMode = false;
    reservaId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private reservaService: ReservaService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.reservaForm = this.fb.group({
            title: ['', Validators.required],
            where: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            category: ['', Validators.required],
            image: [null]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.editMode = true;
                this.reservaId = +id;
                this.reservaService.getById(this.reservaId).subscribe(reserva => {
                    this.reservaForm.patchValue({
                        title: reserva.title,
                        where: reserva.where,
                        price: reserva.price,
                        category: reserva.category
                    });
                });
            }
        });
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    }

    onSubmit(): void {
        const formData = new FormData();
        formData.append('title', this.reservaForm.get('title')?.value);
        formData.append('where', this.reservaForm.get('where')?.value);
        formData.append('price', this.reservaForm.get('price')?.value);
        formData.append('category', this.reservaForm.get('category')?.value);

        if (this.selectedFile) {
            formData.append('image', this.selectedFile);
        }

        if (this.editMode && this.reservaId !== null) {
            this.reservaService.update(this.reservaId, formData).subscribe(() => {
                alert("Atualizado com sucesso!");
                // == RESETAR APÓS SUBMIT
                this.reservaForm = this.fb.group({
                    title: ['', Validators.required],
                    where: ['', Validators.required],
                    price: [0, [Validators.required, Validators.min(0)]],
                    category: ['', Validators.required],
                    image: [null]
                });
            });
        } else {
            this.reservaService.create(formData).subscribe(() => {
                alert("Criado com sucesso!");
                // == RESETAR APÓS SUBMIT
                this.reservaForm = this.fb.group({
                    title: ['', Validators.required],
                    where: ['', Validators.required],
                    price: [0, [Validators.required, Validators.min(0)]],
                    category: ['', Validators.required],
                    image: [null]
                });
            });
        }
    }

}
