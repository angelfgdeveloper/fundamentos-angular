import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  // token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  // login() {
  //   this.authService.login('test@test.com', '123456')
  //   .subscribe(rta => {
  //     this.token = rta.access_token;
  //     console.log(this.token);
  //     this.getProfile();
  //   });
  // }

  // login() {
  //   this.authService.login('test@test.com', '123456')
  //   .pipe(
  //     switchMap((token) => {
  //       this.token = token.access_token;
  //       return this.authService.getProfile();
  //     })
  //   )
  //   .subscribe((user) => {
  //     this.profile = user;
  //   });
  // }

  login() {
    this.authService.loginAndGet('test@test.com', '123456')
    .subscribe(user => {
      this.profile = user;
    });
  }

  // getProfile() {
  //   this.authService.profile(this.token).subscribe((user) => {
  //     // console.log(profile);
  //     this.profile = user;
  //   });
  // }

  // getProfile() {
  //   this.authService.getProfile().subscribe((user) => {
  //     // console.log(profile);
  //     this.profile = user;
  //   });
  // }
}
