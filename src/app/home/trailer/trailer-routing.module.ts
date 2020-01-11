import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrailerComponent } from './trailer.component';


const routes: Routes = [
  { path: '', component: TrailerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrailerRoutingModule { }
