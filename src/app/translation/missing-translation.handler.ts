import { TranslocoConfig, TranslocoMissingHandler, TRANSLOCO_MISSING_HANDLER } from '@ngneat/transloco';

export class CustomHandler implements TranslocoMissingHandler {
  handle(key: string, config: TranslocoConfig) {
    return '...';
  }
}

export const customMissingHandler = {
  provide: TRANSLOCO_MISSING_HANDLER,
  useClass: CustomHandler
};
