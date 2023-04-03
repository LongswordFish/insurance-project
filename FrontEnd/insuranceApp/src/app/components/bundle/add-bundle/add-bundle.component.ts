import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bundle } from '../../../bundle';
import { BundleService } from '../../../bundle.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-bundle',
  templateUrl: './add-bundle.component.html',
  styleUrls: ['./add-bundle.component.css'],
})
export class AddBundleComponent implements OnInit {
  bundles: Bundle[] = [];
  selectedBundle: Bundle | null = null;
  updateForm: FormGroup;
  bundleForm: FormGroup = new FormGroup({
    bundleid: new FormControl<string | null>(null),
    bundlename: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    productids: new FormControl<string | null>(null, [Validators.required]),
    totalPrice: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    location: new FormControl<string | null>(null, [Validators.required]),
    companyid: new FormControl<string | null>(null),
  });

  isUpdateFormOpen: boolean = false;
  isEditing: boolean = false;
  constructor(
    private bundleService: BundleService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      bundleid: [''],
      bundlename: ['', Validators.required],
      productids: ['', Validators.required],
      totalPrice: ['', Validators.required],
      location: ['', Validators.required],
      companyid: [''],
    });
  }
  productIds = [
    '642707950be8eb014b1103f4',
    '6e727f6c33c3401fb0cfa7b6',
    '496ee6b28fbf16a10cd1b0b5',
    '642707950be8eb014b1103f4',
    '6e727f6c33c3401fb0cfa7b6',
    '496ee6b28fbf16a10cd1b0b5',
    '642707950be8eb014b1103f4',
    '6e727f6c33c3401fb0cfa7b6',
    '496ee6b28fbf16a10cd1b0b5',
  ];

  addMoreProductIds(event: MatCheckboxChange): void {
    if (event.checked) {
      // add more product IDs to the list
    } else {
      // remove product IDs from the list
    }
  }

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
    if (this.bundleForm.valid && !this.isEditing) {
      // check if not editing before creating
      let ids = this.bundleForm.get('productids')?.value;
      let idString = Array.isArray(ids) ? ids.join(',') : '';

      const bundle: Bundle = {
        bundleid: this.bundleForm.get('bundleid')?.value,
        bundlename: this.bundleForm.get('bundlename')?.value,
        productids: idString.split(','),
        totalPrice: this.bundleForm.get('totalPrice')?.value,
        location: this.bundleForm.get('location')?.value,
        companyid: this.bundleForm.get('companyid')?.value,
      };
      console.log(bundle.productids);
      this.bundleService.createBundle(bundle).subscribe(
        (data) => {
          console.log(data);
          this.snackBar.open('Bundle created successfully', 'Close', {
            duration: 2000,
          });
          this.getAllBundles();
          this.bundleForm.reset();
        },
        (error) => console.log(error)
      );
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 2000,
      });
    }
  }

  editBundle(bundle: Bundle): void {
    this.selectedBundle = { ...bundle };
    this.bundleForm.patchValue(this.selectedBundle);
    this.isUpdateFormOpen = true;
  }

  updateBundle(id: string, bundle: Bundle): void {
    this.bundleService.updateBundle(id, bundle).subscribe(
      (res) => {
        console.log('Updated bundle', res);
        this.snackBar.open('Bundle updated successfully', 'Close', {
          duration: 2000,
        });
        this.bundles = this.bundles.map((b) => {
          if (b.bundleid === id) {
            return bundle;
          }
          return b;
        });
        this.isUpdateFormOpen = false;
        this.updateForm.reset();
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Bundle not found', 'Close', {
          duration: 2000,
        });
      }
    );
  }

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
