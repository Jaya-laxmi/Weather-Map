import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  action: any;
  constructor(public matSnackBar: MatSnackBar) {}

  public throwError(message,time?) {
    let period;
    if(time)
    period=time;
    else
    period=2500;
    this.matSnackBar.open(message, this.action, {
      duration: period
    });
  }
}
