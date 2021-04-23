import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxContent',
})
export class MaxContentPipe implements PipeTransform {
  transform(fullContent: string): string {
    if (fullContent.length <= 500) {
      return fullContent;
    } else {
      return fullContent.slice(0, 487) + '...';
    }
  }
}
