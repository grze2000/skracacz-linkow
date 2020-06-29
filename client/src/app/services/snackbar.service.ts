import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() { }

  private show = false;
  private message = '';
  private timeout = 5000;
  private showSubject = new Subject<boolean>();
  private messageSubject = new BehaviorSubject<string>(this.message);

  public showSnackbar(message: string, timeout = 5000): void {
    this.message = message;
    this.messageSubject.next(this.message);

    this.show = true;
    this.showSubject.next(this.show);

    this.timeout =  timeout;

    setTimeout(() => {
      this.show = false;
      this.showSubject.next(this.show);
    }, this.timeout);
  }

  public getStatus(): Observable<boolean> {
    return this.showSubject.asObservable();
  }

  public getMessage(): Observable<string> {
    return this.messageSubject.asObservable();
  }

}
