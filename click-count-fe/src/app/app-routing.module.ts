import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClicksComponent } from './clicks/clicks.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/chasingclicks' },
  { path: 'chasingclicks', component: ClicksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
