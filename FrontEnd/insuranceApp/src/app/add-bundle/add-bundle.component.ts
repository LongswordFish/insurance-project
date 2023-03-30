import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bundle } from '../bundle';
import { BundleService } from '../bundle.service';

@Component({
  selector: 'app-add-bundle',
  templateUrl: './add-bundle.component.html',
  styleUrls: ['./add-bundle.component.css'],
})
export class AddBundleComponent implements OnInit {
  bundles: Bundle[] = [];
  selectedBundle?: Bundle;
  bundleForm: FormGroup<any> = new FormGroup({
    bundleid: new FormControl<string | null>(null),
    bundlename: new FormControl<string | null>(null),
    productids: new FormControl<string[] | null>(null),
    totalPrice: new FormControl<number | null>(null),
    location: new FormControl<string | null>(null),
    companyid: new FormControl<string | null>(null),
  });

  constructor(
    private bundleService: BundleService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllBundles();
  }

  getAllBundles(): void {
    this.bundleService.getAllBundles().subscribe(
      (data) => (this.bundles = data),
      (error) => console.log(error)
    );
  }

  getBundleById(id: string): void {
    this.bundleService.getBundleById(id).subscribe(
      (data) => console.log(data),
      (error) => {
        console.log(error);
        this.snackBar.open('Bundle not found', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  createBundle(): void {
    const bundle: Bundle = {
      bundleid: this.bundleForm.get('bundleid')?.value,
      bundlename: this.bundleForm.get('bundlename')?.value,
      productids: this.bundleForm.get('productids')?.value,
      totalPrice: this.bundleForm.get('totalPrice')?.value,
      location: this.bundleForm.get('location')?.value,
      companyid: this.bundleForm.get('companyid')?.value,
    };
    this.bundleService.createBundle(bundle).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Bundle created successfully', 'Close', {
          duration: 2000,
        });
        this.getAllBundles();
      },
      (error) => console.log(error)
    );
  }

  editBundle(bundle: Bundle): void {
    this.selectedBundle = { ...bundle };
    this.bundleForm.patchValue(this.selectedBundle);
  }

  public updateBundle(id: string, bundle: Bundle): void {
    this.bundleService.updateBundle(id, bundle).subscribe(
      (res) => {
        console.log('Updated bundle', res);
        this.snackBar.open('Bundle updated successfully', 'Close', {
          duration: 2000,
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Bundle not found', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  // updateBundle(id: string): void {
  //   if (this.selectedBundle) {
  //     const bundle: Bundle = {
  //       ...this.selectedBundle,
  //       ...this.bundleForm.value,
  //     };
  //     this.bundleService.updateBundle(id, bundle).subscribe(
  //       (data) => {
  //         console.log(data);
  //         this.snackBar.open('Bundle updated successfully', 'Close', {
  //           duration: 2000,
  //         });
  //         this.getAllBundles();
  //         this.selectedBundle = {} as Bundle;
  //         this.bundleForm.reset();
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.snackBar.open('Bundle not found', 'Close', {
  //           duration: 2000,
  //         });
  //       }
  //     );
  //   }
  // }

  deleteBundle(id: string): void {
    this.bundleService.deleteBundle(id).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Bundle deleted successfully', 'Close', {
          duration: 2000,
        });
        this.getAllBundles();
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Bundle not found', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
