import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'ngbDateFormatter' })
export class NgbDateFormatterPipe implements PipeTransform {
    transform(ngbDate: any, format: string): any {
        if (ngbDate) {
            const date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
            const momentDate = moment(date.getTime());
            if (format) {
                return momentDate.format(format);
            }
            return momentDate.format('MM/DD/YYYY');
        }
    }
}
