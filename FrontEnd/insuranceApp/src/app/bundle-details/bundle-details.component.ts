import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BundleService } from '../bundle.service';
import { Bundle } from '../bundle';

@Component({
  selector: 'app-bundle-details',
  templateUrl: './bundle-details.component.html',
  styleUrls: ['./bundle-details.component.css'],
})
export class BundleDetailsComponent {
  bundle!: Bundle;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private bundleService: BundleService
  ) {}

  ngOnInit() {
    const bundleId = this.route.snapshot.paramMap.get('id');
    if (bundleId) {
      this.bundleService.getBundleById(bundleId).subscribe(
        (bundle) => {
          this.bundle = bundle;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  addToCart(): void {
    // Here you can implement your logic to add the bundle to the cart
    console.log('Added to cart:', this.bundle, 'quantity:', this.quantity);
  }
}
