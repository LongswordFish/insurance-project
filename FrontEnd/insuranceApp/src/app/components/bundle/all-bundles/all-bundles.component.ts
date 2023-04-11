import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bundle } from '../../../bundle';
import { BundleService } from '../../../bundle.service';
import { PaginatePipe } from 'ngx-pagination';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BundleFilterPipe } from '../../../bundle-filter.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-bundles',
  templateUrl: './all-bundles.component.html',
  styleUrls: ['./all-bundles.component.css'],
  providers: [PaginatePipe,BundleFilterPipe],
})
export class AllBundlesComponent {
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

  dataSource!: MatTableDataSource<any>
  obs!:Observable<any>
  @ViewChild(MatPaginator)
  paginator !:MatPaginator;


  constructor(
    private bundleService: BundleService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private bundleFilterPipe:BundleFilterPipe
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
      (data) => {
        this.bundles = data;
        this.dataSource = new MatTableDataSource<any>(this.bundles);
        this.dataSource.paginator = this.paginator
        this.obs = this.dataSource.connect()
      },
      (error) => console.log(error)
    );
  }

  editBundle(bundle: Bundle): void {
    this.selectedBundle = { ...bundle };
    this.bundleForm.patchValue(this.selectedBundle);
    this.isUpdateFormOpen = true;
  }

  //call to update bundle backend api
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

  searchTextChange(value:string){
    let source = this.bundleFilterPipe.transform(this.bundles,value);
    this.dataSource = new MatTableDataSource<any>(source);
    this.dataSource.paginator = this.paginator
    this.obs = this.dataSource.connect()
  }
}
