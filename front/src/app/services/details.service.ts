import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class detailsService {

  private features: { name: string; image: string }[] = [
    { name: 'Wi-Fi', image: 'wifi.png' },
    { name: 'Churrasqueira', image: 'churras.png' },
    { name: 'TV', image: 'tv.png' },
  ];
  
  constructor() {}

  getFeatures(): { name: string; image: string }[] {
    return this.features;
  }
}
