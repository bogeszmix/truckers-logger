import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
    { path: 'journey-form', loadChildren: () => import('./journey-form/journey-form.module').then(m => m.JourneyFormModule) },
    { path: 'trailer', loadChildren: () => import('./trailer/trailer.module').then(m => m.TrailerModule) },
    { path: 'statistics', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule) },
    { path: '', loadChildren: () => import('./event/event.module').then(m => m.EventModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
