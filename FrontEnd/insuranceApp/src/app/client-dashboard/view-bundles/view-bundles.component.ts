import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bundle } from '../bundle.model';
import { BundleService } from 'src/app/shared/bundle.service';
import { BundleFilterPipe } from 'src/app/bundle-filter.pipe';

import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-view-bundles',
  templateUrl: './view-bundles.component.html',
  styleUrls: ['./view-bundles.component.css']
})
export class ViewBundlesComponent {
  bundles: Bundle[] = [];
  selectedBundle: Bundle | null = null;
  updateForm: FormGroup;
  bundleForm: FormGroup = new FormGroup({
    bundleid: new FormControl<string | null>(null),
    bundlename: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    productids: new FormControl<string[] | null>(null, [Validators.required]),
    totalPrice: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    location: new FormControl<string | null>(null, [Validators.required]),
    companyid: new FormControl<string | null>(null, [Validators.required]),
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
      companyid: ['', Validators.required],
    });
  }
  searchText: string = '';
  filteredBundles: Bundle[] = [];

  //   applyFilter(filterValue: string) {
  //     this.searchText = filterValue.trim().toLowerCase();
  //
  //     this.filteredBundles = this.bundles.filter(
  //       (bundle) =>
  //         bundle.bundleid.toLowerCase().includes(this.searchText) ||
  //         bundle.bundlename?.toLowerCase().includes(this.searchText) ||
  //         bundle.productids.includes(this.searchText) ||
  //         bundle.totalPrice.toLowerCase().includes(this.searchText) ||
  //         bundle.location.toLowerCase().includes(this.searchText) ||
  //         bundle.companyid.toLowerCase().includes(this.searchText)
  //     );
  //   }

  // pagination
  pageSizeOptions: number[] = [5, 10, 15];
  pageSize: number = this.pageSizeOptions[0];
  pageIndex: number = 0;

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngOnInit(): void {
    this.getAllBundles();
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

  getAllBundles(): void {
    this.bundleService.getAllBundles().subscribe(
      (data) => (this.bundles = data),
      (error) => console.log(error)
    );
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

  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
    { id: 8, name: 'Item 8' },
    { id: 9, name: 'Item 9' },
    { id: 10, name: 'Item 10' },
    { id: 11, name: 'Item 11' },
    { id: 12, name: 'Item 12' },
    { id: 13, name: 'Item 13' },
    { id: 14, name: 'Item 14' },
    { id: 15, name: 'Item 15' },
  ];

  p: number = 1;
}
