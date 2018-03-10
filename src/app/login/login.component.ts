import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public authGuard: boolean = false;
  theForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.auth.authChangeObs()
      .subscribe((res) => {
        this.authGuard = res;
        if (this.authGuard) {
          this.router.navigate(['convert']);
        } else {
          this.router.navigate(['login']);
        }
      })
  }

  // login user with form data
  login() {
    console.log(this.theForm);
    this.auth.loginData(this.theForm.value);
  }

}
