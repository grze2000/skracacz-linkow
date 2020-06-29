import { ApiService } from './../../services/api.service';
import { SnackbarService } from './../../services/snackbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private snackbarService: SnackbarService, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  url = '';
  results = false;
  slide = false;
  animationDuration = 1; // seconds

  public submit() {
    if(/^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#]+\.?)+(\/[^\s]*)?$/i.test(this.url)) {
      this.apiService.getShortUrl(this.url).subscribe(code => {
        this.slide = true;
        setTimeout(() => {
          this.url = window.location.href+code.code;
          this.results = true;
        }, this.animationDuration*500);
      }, error => {
        this.snackbarService.showSnackbar('Wystąpił błąd! Nie można wygenerować linku!');
      });
    } else {
      this.snackbarService.showSnackbar('Nieprawidłowy adres url!');
    }
  }

  public schowek() {
    if(this.results) {
      navigator.clipboard.writeText(this.url).then(() => {
        this.snackbarService.showSnackbar('Skopiowano do schowka!');
      }).catch(() => {
        this.snackbarService.showSnackbar('Błąd! Nie można skopiować do schowka!');
      });
    } else {
      navigator.clipboard.readText().then(data => {
        this.url = data;
      }).catch(() => {
        this.snackbarService.showSnackbar('Błąd! Nie można odczytać ze schowka!');
      });
    }
  }

}
