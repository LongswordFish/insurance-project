import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: true,
})
export class SearchPipe implements PipeTransform {
  transform(value: any, searchTerm: string): any {
    if (!value || !searchTerm) {
      return value;
    }

    return value.filter((item: any) => {
      return item.bundlename.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  // code for transform method goes here
}
