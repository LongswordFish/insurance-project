import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddAProductComponent {

  productForm!: FormGroup;
  newLocations!: FormArray;
  companyId: string = "";
  categoryOptions: string[] = ['House', 'Auto', 'Life'];
  locationOptions: string[] = ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Quebec City', 'Hamilton', 'Winnipeg', 'Halifax'];

  constructor(private formBuilder: FormBuilder, 
              private route: ActivatedRoute, 
              private productService: ProductService,
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddAProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string ) 
  { 
      this.productForm = this.formBuilder.group({
        category: ['', Validators.required],
        picture: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        locations: this.formBuilder.array([this.initLocation()]),
        available: [false], 
      });
    
  }

  initLocation() {
    return this.formBuilder.group({
      locationName: ['', Validators.required],
      locationPrice: ['', Validators.required]
    });
  }

  get locationForms() {
    return this.productForm.get('locations') as FormArray;
  }

  addLocation() {
    const location = this.formBuilder.group({
      locationName: ['', Validators.required],
      locationPrice: ['', Validators.required]
    });

    this.locationForms.push(location);
  }

  removeLocation(i: number) {
    this.locationForms.removeAt(i);
  }


  cancel() {
    this.dialogRef.close();
  }


  addProduct() {
    // Logic to add new product
    if(this.productForm.valid){
      //also adding company id to productform obj, here this.data contains the companyID
      // console.log(this.data);
      // this.productForm.value.companyId = this.data;
      // console.log(this.productForm.value);

      const dataToSend = {
        
        category: this.productForm.get('category')!.value,
        picture: this.productForm.get('picture')!.value,
        name: this.productForm.get('name')!.value,
        description: this.productForm.get('description')!.value,
        price: this.productForm.get('price')!.value,
        locations: this.productForm.get('locations')!.value,
        available: this.productForm.get('available')!.value,
        companyId: this.data
      };
      // console.log(dataToSend);

    
      // api call to add product
      this.productService.addProduct(dataToSend).subscribe(
        (res) =>{
          console.log(res);
          this._snackBar.open("Product added successfully!!", "Close");
          this.cancel();
        }, (err) => {
          console.log(err);
          this._snackBar.open("Product was not added!!", "Close");
        }
      )
    }
    
    
    
    
  }

}