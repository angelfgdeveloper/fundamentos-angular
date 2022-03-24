import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // https://www.w3schools.com/howto/img_avatar.png
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  onLoaded(img: string) {
    console.log('Log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    })
    .subscribe((rta) => {
      console.log(rta);
    })
  }

  // login() {
  //   this.authService.login('test@test.com', '123456')
  //   .subscribe((rta) => {
  //     console.log(rta.access_token);
  //     this.token = rta.access_token;
  //   })
  // }

  // getProfile() {
  //   this.authService.profile(this.token)
  //   .subscribe((profile) => {
  //     console.log(profile);
  //   });
  // }
}
