import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './article/article.model';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  constructor(private client: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.client.get<Article[]>('http://localhost:3000/articles');
  }

  addArticle(article: Article): Observable<Article[]> {
    return this.client.post<Article[]>(
      'http://localhost:3000/articles',
      article
    );
  }

  updateArticle(article: Article): Observable<any> {
    return this.client.put(
      `http://localhost:3000/articles/${article.id}`,
      article
    );
  }

  deleteArticle(id: number): Observable<any> {
    return this.client.delete<void>(`http://localhost:3000/articles/${id}`);
  }
}
