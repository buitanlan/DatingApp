import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member  = {} as Member;

  constructor() { }

  ngOnInit(): void {
  }

}
