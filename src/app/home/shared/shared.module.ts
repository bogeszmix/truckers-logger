import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderSelectorComponent } from './components/order-selector/order-selector.component';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ToastComponent, OrderSelectorComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule
  ],
  exports: [ToastComponent, OrderSelectorComponent]
})
export class SharedModule { }
