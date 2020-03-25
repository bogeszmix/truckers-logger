import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  successToastStyle = 'bg-success text-light';
  alertToastStyle = 'bg-danger text-light';
  delay = 2000;
  defaultToastOptions = { classname: 'bg-success text-light', delay: this.delay, header: '' };

  constructor() {}

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showSuccess(text?: string) {
    this.defaultToastOptions.classname = this.successToastStyle;
    this.show(text, this.defaultToastOptions);
  }

  showAlert(text?: string) {
    this.defaultToastOptions.classname = this.alertToastStyle;
    this.show(text, this.defaultToastOptions);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
