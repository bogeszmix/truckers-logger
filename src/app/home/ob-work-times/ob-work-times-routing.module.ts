import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObWorkTimesComponent } from './ob-work-times.component';


const routes: Routes = [
  { path: '', component: ObWorkTimesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObWorkTimesRoutingModule { }
