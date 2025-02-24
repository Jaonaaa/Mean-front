import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private categorieURL = environment.apiURL + 'categories';
  http = inject(HttpClient);

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.categorieURL);
  }
  addCategorie(Categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.categorieURL, Categorie);
  }
  updateCategorie(id: string, Categorie: Categorie): Observable<any> {
    return this.http.put(`${this.categorieURL}/${id}`, Categorie);
  }
  deleteCategorie(id: string): Observable<any> {
    return this.http.delete(`${this.categorieURL}/${id}`);
  }
}
