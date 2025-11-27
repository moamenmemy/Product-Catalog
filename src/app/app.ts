import { Component, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('product-catalog');
 currentRoute = signal('Dashboard');
   loading = signal(false);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

         if (url.startsWith('/products/') && url !== '/products') {
      this.currentRoute.set('Product Detail');
    } else if (url === '/products') {
      this.currentRoute.set('Products List');
    } else if (url === '/dashboard') {
      this.currentRoute.set('Dashboard');
    } else if (url === '/login') {
      this.currentRoute.set('Login');
    } else {
      this.currentRoute.set('');
    }
  }
    });
  }
}
