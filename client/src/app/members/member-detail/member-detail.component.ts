import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/shared/models/member';
import { MemberService } from 'src/app/shared/services/member.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  template: `
    <div class="row" *ngIf="member">
      <div class="col-4">
        <div class="card">
          <img src="{{ member.photoUrl || './asset/user.png' }}" alt="{{ member.knownAs }}"
               class="card-img-top img-thumbnail"/>
          <div class="card-body">
            <div>
              <strong>Location:</strong>
              <p>{{ member.city }}, {{ member.country }}</p>
            </div>
            <div>
              <strong>Age:</strong>
              <p>{{ member.age }}</p>
            </div>
            <div>
              <strong>Member since:</strong>
              <p>{{ member.created }}</p>
            </div>
            <div>
              <strong>Last Active:</strong>
              <p>{{ member.lastActive }}</p>
            </div>
          </div>
          <div class="card-footer">
            <div class="btn-group d-flex">
              <button class="btn btn-primary">Like</button>
              <button class="btn btn-success">Message</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <tabset class="member-tabset">
          <tab heading='About {{member.knownAs}}'>
            <h4>Description</h4>
            <p>{{member.introduction}}</p>
            <h4>Looking for</h4>
            <p>{{member.lookingFor}}</p>
          </tab>
          <tab heading='Interests'>
            <h4>Description</h4>
            <p>{{member.interests}}</p>

          </tab>
          <tab heading='Photos'>
            <ngx-gallery [options]="galleryOptions" [images]="galleryImages"
                         style="display: inline-block; margin-bottom: 20px;"></ngx-gallery>

          </tab>
          <tab heading='Messages'>
            <h4>Messages will go here</h4>

          </tab>
        </tabset>
      </div>
    </div>
  `,
  styleUrls: ['./member-detail.component.scss'],
  standalone: true,
  imports: [
    NgxGalleryModule,
    TabsModule,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailComponent implements OnInit {
  member: Member | null = null;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  readonly memberService = inject(MemberService);
  readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls: NgxGalleryImage[] = [];
    if (!this.member) {
      return imageUrls;
    }
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username'))?.subscribe((member: Member) => {
      this.member = member;
      this.galleryImages = this.getImages();
    });
  }

}
