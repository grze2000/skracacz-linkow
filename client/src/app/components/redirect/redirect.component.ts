import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private ApiService: ApiService) { }

  message = 'Przekierowanie...';

  ngOnInit(): void {
    this.ApiService.getUrl().subscribe(data => {
      window.location.href = data.url;
    }, error => {
      this.message = 'Wystąpił błąd! Nie można odnaleźć podanego adresu!';
    });
  }

}
