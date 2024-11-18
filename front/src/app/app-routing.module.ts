import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { CardComponent } from './components/card/card.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [

  { path: 'reservas', component: CardComponent },
  { path: 'reservas/nova', component: FormComponent },
  { path: 'reservas/editar/:id', component: FormComponent },
  { path: 'view', component: ViewComponent },
  { path: '', redirectTo: '/reservas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
