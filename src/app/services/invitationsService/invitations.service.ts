import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {
  url: string = "http://localhost:8086/Voyage/invitation";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.url}/listInvitations`);
  }

  getById(id: string) {
    return this.http.get(`${this.url}/recupererInvitation/${id}`);
  }
}
