import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Reserva {
    id?: number;
    title: string;
    where: string;
    price: number;
    category: string;
    image?: File | string;
}

@Injectable({
    providedIn: 'root'
})
export class ReservaService {
    private apiUrl = 'http://localhost:8000/api/reservas';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Reserva[]> {
        return this.http.get<Reserva[]>(this.apiUrl);
    }

    getById(id: number): Observable<Reserva> {
        return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
    }

    create(data: FormData): Observable<Reserva> {
        return this.http.post<Reserva>(this.apiUrl, data);
    }

    update(id: number, data: FormData): Observable<Reserva> {
        return this.http.post<Reserva>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
