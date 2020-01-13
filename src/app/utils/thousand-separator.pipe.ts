import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'thousandSeparator' })
export class ThousandSeparatorPipe implements PipeTransform {
    transform(value: number, seperator: string): any {
        if (value) {
            return value.toString().replace(/\B(?=(\d{3})+\b)/g, (seperator ? seperator : ','));
        }
        return value;
    }
}
