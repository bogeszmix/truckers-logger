import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private translocoService: TranslocoService
  ) { }

  getInstant(key: string): string {
    if (key.length > 0) {
      return this.translocoService.translate(key);
    }
  }

  setActiveLang(langCode: string) {
    if (langCode.length > 0 && langCode.length <= 2) {
      this.translocoService.setActiveLang(langCode);
    }
  }
}
