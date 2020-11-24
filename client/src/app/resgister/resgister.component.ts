import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./resgister.component.css']
})
export class ResgisterComponent implements OnInit {
  @Input() usersFormHomeComponent: any;
  model: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.model);
  }

  cancel() {
    console.log(this.model);
  }

}
