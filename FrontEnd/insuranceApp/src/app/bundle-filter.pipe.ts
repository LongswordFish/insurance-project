import { Pipe, PipeTransform } from '@angular/core';
import { Bundle } from './bundle';

@Pipe({
  name: 'bundleFilter',
})
export class BundleFilterPipe implements PipeTransform {
  transform(bundles: Bundle[], searchText: string): Bundle[] {
    if (!bundles || !searchText) {
      return bundles;
    }

    searchText = searchText.toLowerCase();
    return bundles.filter(
      (bundle) =>
        bundle.bundleid.toLowerCase().indexOf(searchText) !== -1 ||
        (bundle.bundlename &&
          bundle.bundlename.toLowerCase().indexOf(searchText) !== -1)
    );
  }
}
