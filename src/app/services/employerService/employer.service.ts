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

  add(employe: any) {
    return this.http.post(`${this.url}/addEmploye`, employe);
  }

  getById(id: string) {
    return this.http.get(`${this.url}/recupererEmploye/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/supprimerEmploye/${id}`);
  }

  update(employe: any) {
    return this.http.put(`${this.url}/modifierEmploye`, employe);
  }
}
