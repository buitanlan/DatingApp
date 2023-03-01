import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/models/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  template: `
    <div class="card mb-4">
      <div class="card-img-wrapper">
        <img src="{{member.photoUrl}}" alt="{{member.knownAs}}" class="card-img-top">
        <ul class="list-inline member-icons animate text-center">
          <li class="list-inline-item">
            <button routerLink='/members/{{member.username}}' class="btn btn-primary">
              <i class="fas fa-user"></i></button>
          </li>
          <li class="list-inline-item">
            <button class="btn btn-primary">
              <i class="fas fa-heart"></i></button>
          </li>
          <li class="list-inline-item">
            <button class="btn btn-primary">
              <i class="fas fa-envelope"></i></button>
          </li>
        </ul>
      </div>
      <div class="card-body p-1">
        <h6 class="card-title text-center mb-1">
          <i class="fas fa-user mr-2"></i>
          {{member.knownAs}}
        </h6>
        <p class="card-text text-muted text-center">{{member.city}}</p>
      </div>
    </div>

  `,
  styleUrls: ['./member-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member = {} as Member;

  constructor() {
  }

  ngOnInit(): void {
  }

}
