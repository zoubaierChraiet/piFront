import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  url: string = "http://localhost:8086/Voyage/employe";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.url}/listeEmployes`);
  }

  getById(id: string) {
    return this.http.get(`${this.url}/recupererEmploye/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/supprimerEmploye/${id}`);
  }

  update(invitation: any) {
    return this.http.put(`${this.url}/modifierEmploye`, invitation);
  }
}
