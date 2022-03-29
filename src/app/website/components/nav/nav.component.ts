import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { StoreService } from '../../../services/store.service';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/product.model';

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
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });

    this.getAllCategories();
    this.authService.user$
      .subscribe(data => {
        this.profile = data;
      })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    // this.authService.loginAndGet('angel@mail.com', '123456')
    // .subscribe(user => {
    //   this.profile = user;
    // });
    this.authService.loginAndGet('angel@mail.com', '123456')
    // this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe((data) => {
      this.categories = data;
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null; // limpiar el perfil
    this.router.navigate(['/home']);
  }

}
