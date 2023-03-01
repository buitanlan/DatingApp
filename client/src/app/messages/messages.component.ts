import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  template: `
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
