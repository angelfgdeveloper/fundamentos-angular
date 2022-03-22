import { Component } from '@angular/core';

import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // https://www.w3schools.com/howto/img_avatar.png
  imgParent = '';
  showImg = true;

  onLoaded(img: string) {
    console.log('Log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
