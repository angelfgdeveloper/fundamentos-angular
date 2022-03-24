import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

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
  imgRta = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService
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

  downloadPDF() {
    this.filesService.getFile(
      'my_pdf',
      'dummy.pdf',
      'application/pdf'
    ).subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      })
    }

  }
}
