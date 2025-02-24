import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Article } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articleURL = environment.apiURL + 'articles';
  http = inject(HttpClient);

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articleURL);
  }
  getArticlesByCategorie(idCategorie: String): Observable<Article[]> {
    return this.http.get<Article[]>(
      this.articleURL + '/categories/' + idCategorie
    );
  }
  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.articleURL, article);
  }
  updateArticle(id: string, article: Article): Observable<any> {
    return this.http.put(`${this.articleURL}/${id}`, article);
  }
  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.articleURL}/${id}`);
  }
}
