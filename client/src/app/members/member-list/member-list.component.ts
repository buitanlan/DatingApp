import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/models/member';
import { MemberService } from 'src/app/shared/services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
  standalone: true,
  imports: [
    MemberCardComponent,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent implements OnInit {
  members: Member[] = {} as Member[];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

}
