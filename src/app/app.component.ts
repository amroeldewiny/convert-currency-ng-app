import { Component } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public show: boolean;
  constructor(public auth: AuthService, private router: Router) {
    this.checkShow(this.show);
  }

  // show and hide nav buttons
  checkShow(value) {
    this.auth.authChangeObs()
      .subscribe((res) => {
        value = res;
        if (this.show) {
          this.show = value;
        } else {
          this.show = value;
        }
      })
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
