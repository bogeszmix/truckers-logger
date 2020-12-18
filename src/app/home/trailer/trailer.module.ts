import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { CreateTrailerComponent } from './components/modals/create-trailer/create-trailer.component';
import { CreateEditTrailerComponent } from './components/shared/create-edit-trailer/create-edit-trailer.component';
import { TrailerRoutingModule } from './trailer-routing.module';
import { TrailerComponent } from './trailer.component';
import { ListTrailerComponent } from './components/list-trailer/list-trailer.component';



@NgModule({
  declarations: [TrailerComponent, CreateTrailerComponent, CreateEditTrailerComponent, ListTrailerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    TrailerRoutingModule,
    TranslocoModule
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: {scope: 'home/trailer', alias: 'TRAILER'} }
  ]
})
export class TrailerModule { }
