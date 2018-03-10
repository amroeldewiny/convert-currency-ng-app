import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency-service/currency.service';
import { IRate } from '../interface/rate';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent implements OnInit {
  private authGuard: boolean = false;
  public user: any;
  public rates: IRate[] = [];
  public base: string = 'EUR';
  public date: any;
  public currencyOne: any;
  public currencyTwo: any;
  public baseCurrency: any;
  public convertCurrency: any;

  public valueOne: any;

  constructor(private cs: CurrencyService, public auth: AuthService, private router: Router) {
    if (localStorage.getItem("token") || this.auth.authenticated.next(true)) {
      this.authGuard = true;
    }
  }

  ngOnInit() {
    console.log(this.authGuard);
    if (this.authGuard === false) {
      this.authGuard = this.auth.authGuard;
      this.auth.authenticated.next(false);
      this.router.navigate(['login']);
    } else {
      this.authGuard = true;
      this.auth.authenticated.next(true);
      this.router.navigate(['convert']);
      // call the gitLists function
      this.getLists();

    }
  }

  //get user after page load it.
  ngAfterViewInit() {
    this.getUser();
  }

  //get user data
  getUser() {
    return new Promise((resolve, reject) => {
      this.auth.getUser()
        .then((res: any) => {
          this.user = res.user;
          resolve();
        }, (err) => {
          reject(err);
        })
    })
  }

  // get currency list
  getLists() {
    this.cs.getRates(this.base).then((res: any) => {
      this.date = res.date;
      this.rates = res.rates;
    });
  }

  convert(id: string) {
    if (id === 'from') {
      this.currencyTwo = (this.currencyOne / this.baseCurrency) * this.convertCurrency;
    } else {
      this.currencyOne = (this.currencyTwo / this.convertCurrency) * this.baseCurrency;
    }

  }

}
