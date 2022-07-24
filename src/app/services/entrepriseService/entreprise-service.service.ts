import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseServiceService {
  url: string = "http://localhost:8086/Voyage/entreprise";

  constructor(private http: HttpClient) { }

  signUp(entreprise: any) {
    return this.http.post(`${this.url}/addEntreprise`, entreprise);
  }
}
