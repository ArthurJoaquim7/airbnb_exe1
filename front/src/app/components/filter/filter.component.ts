import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  ngOnInit(): void {}

  categories = [
    { name: 'Favoritos', icon: '/assets/favorito.png' },
    { name: 'Cabana', icon: '/assets/cabana.png' },
    { name: 'Em frente à praia', icon: '/assets/de-praia.png' },
    { name: 'Ilhas', icon: '/assets/ilhas-de-palmeiras.png' },
    { name: 'Mansões', icon: '/assets/mansao.png' },
    { name: 'Piscinas', icon: '/assets/swimming-pool.png' },
    { name: 'Casa na árvore', icon: '/assets/casa-na-arvore.png' },
  ];

  selectedCategory = '';

  constructor(private filterService: FilterService) {}

  onSelect(category: string) {
    this.selectedCategory = category;
    this.filterService.setCategory(category); // ENVIA PARA O CardComponent
  }
}
