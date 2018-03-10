import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRate } from '../../interface/rate';

@Injectable()
export class CurrencyService {

  private apiUrl = 'https://api.fixer.io/latest';
  public rateDate: string;
  public rates: IRate[] = [];

  constructor(private http: HttpClient) { }

  // get Currency rates api url
  getRates(base: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}?base=${base}`)
        .subscribe((res: any) => {
          // make base currency  = 1
          res.rates[base] = 1.00;
          // maping the result object
          Object.keys(res.rates).map((key, i) => {
            this.rates.push({
              id: i,
              name: key,
              rate: res.rates[key],
            });
          });

          // sort BY rate.name ASC
          this.rates.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })
          resolve({ rates: this.rates, date: res.date });
        }, (err) => {
          reject(err);
        });
    });
  } // End Promise

}
