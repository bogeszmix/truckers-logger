import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderSelectorComponent } from './components/order-selector/order-selector.component';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfExportComponent } from './components/pdf-export/pdf-export.component';



@NgModule({
  declarations: [ToastComponent, OrderSelectorComponent, PdfExportComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule
  ],
  exports: [ToastComponent, OrderSelectorComponent, PdfExportComponent]
})
export class SharedModule { }
