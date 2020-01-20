import { DateNgBootstrapModel } from './date-ngbootstrap.model';
export interface EventFilterModel {
    eventType?: string;
    dateFrom?: DateNgBootstrapModel;
    dateTo?: DateNgBootstrapModel;
}
