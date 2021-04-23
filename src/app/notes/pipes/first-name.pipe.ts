import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName',
})
export class FirstNamePipe implements PipeTransform {
  transform(fullName: string): string {
    const [firstName] = fullName.split(' ');
    return firstName;
  }
}
