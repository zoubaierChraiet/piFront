import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'piFront';
  userName = ""

  isLoggedIn = false

  constructor(private router: Router) {}

  ngOnInit() {
    const user = window.localStorage.getItem('user');
    if(user) {
      this.isLoggedIn = true;
      this.userName = "Bonjour " + JSON.parse(user)?.nomEntreprise
    }
  }

  logout() {
    window.localStorage.removeItem("user");
    window.location.href = '/'
  }

  goToProfile() {
    const user = window.localStorage.getItem('user');
    this.router.navigate([`/update-entreprise/${JSON.parse(user as string)?.idEntreprise}`]);
  }
}
