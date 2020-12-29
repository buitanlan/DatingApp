import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;

  readonly token = JSON.parse(localStorage.getItem('user'))?.token;
  readonly httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    })
  };

  constructor(private http: HttpClient) { }
  getMembers() {
    console.log(this.httpOptions);
    return this.http.get<Member[]>(this.baseUrl + 'users', this.httpOptions);
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username, this.httpOptions);
  }
}
