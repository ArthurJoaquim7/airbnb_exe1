import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class detailsService {

  private features: { name: string; image: string }[] = [
    { name: 'Wi-Fi', image: 'wifi.png' },
    { name: 'Churrasqueira', image: 'churras.png' },
    { name: 'TV', image: 'tv.png' },
    { name: 'Ar-Condicionado', image: 'ar.png' },
    { name: 'Estacionamento incluso', image: 'carro.png' },
    { name: 'Equipamento de treino', image: 'gym.png' },
    { name: 'Cozinha', image: 'cozinha.png' },
    { name: 'Máquina de lavar', image: 'maquina.png' },
  ];
  
  constructor() {}

  getFeatures(): { name: string; image: string }[] {
    return this.features;
  }
}
