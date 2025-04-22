import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class detailsService {
  private features: string[] = ['Wi-fi', 'Cozinha', 'TV', 'Estacionamento incluído', 'Churrasqueira', 'Equipamento de Treino', 'Maquina de Lavar'];

  constructor() {}

  getFeatures(): string[] {
    return this.features;
  }
}
