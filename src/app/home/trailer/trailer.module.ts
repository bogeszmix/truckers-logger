import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { SharedModule } from '../shared/shared.module';
import { CreateTrailerComponent } from './components/modals/create-trailer/create-trailer.component';
import { CreateEditTrailerComponent } from './components/shared/create-edit-trailer/create-edit-trailer.component';
import { TrailerListItemComponent } from './components/trailer-list-item/trailer-list-item.component';
import { TrailerListComponent } from './components/trailer-list/trailer-list.component';
import { TrailerRoutingModule } from './trailer-routing.module';
import { TrailerComponent } from './trailer.component';



@NgModule({
  declarations: [TrailerComponent, CreateTrailerComponent, CreateEditTrailerComponent, TrailerListComponent, TrailerListItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    TrailerRoutingModule,
    SharedModule,
    TranslocoModule
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: {scope: 'home/trailer', alias: 'TRAILER'} }
  ]
})
export class TrailerModule { }
