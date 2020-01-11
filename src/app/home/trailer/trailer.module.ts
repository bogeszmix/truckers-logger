import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrailerRoutingModule } from './trailer-routing.module';
import { TrailerComponent } from './trailer.component';


@NgModule({
  declarations: [TrailerComponent],
  imports: [
    CommonModule,
    TrailerRoutingModule
  ]
})
export class TrailerModule { }
