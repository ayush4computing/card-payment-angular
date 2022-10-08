import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideCardNumber'
})
export class HideCardNumberPipe implements PipeTransform {

  transform(value:string): string {
    var str = "XXXX-XXXX-XXXX-";
    return str.concat(value.substring(12));
  }

}
