import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  slides = [
    { image: 'assets/images/slide1.jpg', alt: 'Slide 1' },
    { image: 'assets/images/slide2.jpg', alt: 'Slide 2' },
    { image: 'assets/images/slide3.jpg', alt: 'Slide 3' },
  ];
}
