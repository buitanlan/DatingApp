import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/models/member';
import { MemberService } from 'src/app/shared/services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-member-list',
  template: `
    <div class="row">
      <div *ngFor="let member of members" class="col-2">
        <app-member-card [member]="member"></app-member-card>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    MemberCardComponent,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];

  readonly memberService = inject(MemberService);

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

}
