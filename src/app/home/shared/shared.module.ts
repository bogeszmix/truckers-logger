import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbPopoverModule, NgbTimepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { OrderSelectorComponent } from './components/order-selector/order-selector.component';
import { PdfExportComponent } from './components/pdf-export/pdf-export.component';
import { ToastComponent } from './components/toast/toast.component';
import { DateFormatTimePipe } from './pipes/date-format-time/date-format-time.pipe';
import { DateTimeFormatPipe } from './pipes/date-time-format/date-time-format.pipe';
import { OrderByDatePipe } from './pipes/order-by-date/order-by-date.pipe';

@NgModule({
  declarations: [
    ToastComponent,
    OrderSelectorComponent,
    PdfExportComponent,
    DateFormatTimePipe,
    OrderByDatePipe,
    DateTimePickerComponent,
    DateTimeFormatPipe,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    NgbTimepickerModule
  ],
  exports: [
    ToastComponent,
    OrderSelectorComponent,
    PdfExportComponent,
    DateFormatTimePipe,
    OrderByDatePipe,
    DateTimePickerComponent,
    DateTimeFormatPipe
  ],
})
export class SharedModule {}
