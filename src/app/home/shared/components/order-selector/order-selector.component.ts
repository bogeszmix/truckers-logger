import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderOptionModel } from '../../models/order-option.model';

@Component({
  selector: 'app-order-selector',
  templateUrl: './order-selector.component.html',
  styleUrls: ['./order-selector.component.scss']
})
export class OrderSelectorComponent implements OnInit, OnDestroy {

  formSub: Subscription;

  @Input() orderOptions: OrderOptionModel[];
  @Output() selectedOrderMode = new EventEmitter<string>();
  orderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initOrderForm();
    this.checkOrderForm();
    this.emitDefaultOption(this.orderOptions);
  }

  ngOnDestroy(): void {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }

  checkOrderForm() {
    this.formSub = this.orderForm.valueChanges.subscribe((selectedOrder: any) => {
      this.selectedOrderMode.emit(selectedOrder.orderField);
    });
  }

  initOrderForm() {
    this.orderForm = this.formBuilder.group({
      orderField: []
    });
  }

  emitDefaultOption(optionList: OrderOptionModel[]) {
    if (optionList) {
      const defaultOptionObject = optionList.find((optionItem: OrderOptionModel) => optionItem.default);
      this.selectedOrderMode.emit(defaultOptionObject.value);
    }
  }

}
