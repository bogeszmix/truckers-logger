import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JourneyFormRoutingModule } from './journey-form-routing.module';
import { JourneyFormComponent } from './journey-form.component';


@NgModule({
  declarations: [JourneyFormComponent],
  imports: [
    CommonModule,
    JourneyFormRoutingModule
  ]
})
export class JourneyFormModule { }
