import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimNulls'
})
export class TrimNullsPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): string {    
    return value.flat().filter((v: any) => v).join(', ');;
  }

}
