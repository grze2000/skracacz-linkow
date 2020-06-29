import { SnackbarService } from './../../services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        state('open', style({opacity: 1})),
        state('closed', style({opacity: 0})),
        transition('open => closed', [
          animate('0.3s')
        ]),
        transition('closed => open', [
          animate('0.3s')
        ])
      ]
    )
  ]
})
export class SnackbarComponent implements OnInit {

  constructor(private snackbarSerivce: SnackbarService) { }

  status = false;
  message = '';

  ngOnInit(): void {
    this.snackbarSerivce.getStatus().subscribe((status: boolean) => {
      this.status = status;
    });

    this.snackbarSerivce.getMessage().subscribe((message: string) => {
      this.message = message;
    });
  }

}
