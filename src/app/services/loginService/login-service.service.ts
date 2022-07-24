import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  url: string = "http://localhost:8086/Voyage/invitation/recupererInvitation/1";

  constructor(private http: HttpClient) { 
  }
  
  getAll() {
    return this.http.get(this.url);
  }
}
