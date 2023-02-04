import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;

  // readonly token = JSON.parse(localStorage.getItem('user'))?.token;
  // readonly httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`,
  //   })
  // };

  constructor(private http: HttpClient) { }
  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string | null): any {
    if (username){
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
    }
  }
}
