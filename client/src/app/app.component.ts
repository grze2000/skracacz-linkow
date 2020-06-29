import { SnackbarService } from './services/snackbar.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SnackbarService]
})
export class AppComponent {
  title = 'skracacz-linkow';
}
