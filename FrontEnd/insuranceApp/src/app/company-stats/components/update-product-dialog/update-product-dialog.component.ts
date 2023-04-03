import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Location {
  locationName: string;
  locationPrice: number;
}

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent {
  updateProductForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product 
  ) {
    this.updateProductForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      picture: ['', Validators.required],
      locations: this.fb.array([]), // add locations FormArray
      available: ['']
    });

    if (data) {
      this.updateProductForm.patchValue(data);
      this.setLocations(data.locations); // set locations if they exist
    }
  }

  get locations(): FormArray {
    return this.updateProductForm.get('locations') as FormArray;
  }

  // add a new location Form Group
  addLocation() {
    const location = this.fb.group({
      locationName: ['', Validators.required],
      locationPrice: ['', Validators.required]
    });
    this.locations.push(location);
  }

  // remove a location Form Group
  removeLocation(index: number) {
    this.locations.removeAt(index);
  }

  // set locations FormArray
  setLocations(locations: Location[]) {
    const locationFGs = locations.map(location => this.fb.group(location));
    const locationFormArray = this.fb.array(locationFGs);
    this.updateProductForm.setControl('locations', locationFormArray);
  }

  cancel() {
    this.dialogRef.close();
  }

  update() {
    if (this.updateProductForm.valid) {
      const product = this.updateProductForm.value as Product;
      // console.log(this.data);
      if (this.data) {
        Object.assign(this.data, product);
      }
      // make a API call to update product data
      this.productService.updateProduct(this.data.productId, this.data).subscribe(
        (data) => {
          console.log("updated record");
          this._snackBar.open("Product updated successfully!!", "Close");
          this.dialogRef.close();
        }, (err) => {
          console.log(err);
          this._snackBar.open("Product was not updated!!", "Close");
        })
    }

    
  }

}

