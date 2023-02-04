import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  standalone: true,
  imports: [
    NgxGalleryModule,
    TabsModule,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailComponent implements OnInit {
  member: Member = {} as Member;
  galleryOptions: NgxGalleryOptions[] = {} as NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = {} as NgxGalleryImage[];
  constructor(private memberService: MemberService, private route: ActivatedRoute) { }

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
  getImages(): NgxGalleryImage[]{
    const imageUrls = [];
    for ( const photo of this.member.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return  imageUrls;
  }
  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe((member: Member) => {
      this.member = member;
      this.galleryImages = this.getImages();
    });
  }

}
