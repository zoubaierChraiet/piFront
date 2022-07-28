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

  logIn(matricule: string, mdp: string) {
    return this.http.post(`${this.url}/authenticate?matricule=${matricule}&password=${mdp}`, null);
  }

  update(entreprise: any) {
    return this.http.put(`${this.url}/modifierEntreprise`, entreprise);
  }

  getById(id: string) {
    return this.http.get(`${this.url}/recupererEntreprise/${id}`);
  }

  getAll() {
    return this.http.get(`${this.url}/listeEntreprises`);
  }
}
