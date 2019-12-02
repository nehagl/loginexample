import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articleUrl = "/api/articles";
   
  constructor(private http: HttpClient) {   }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articleUrl).pipe(
        tap(articles => console.log("Number of articles: " + articles.length)),
        catchError(this.handleError)
    );
}
createArticle(article: Article): Observable<number> {
  let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
  });
  return this.http.post<Article>(this.articleUrl + "/" + article.id, article, {
    headers: httpHeaders,
    observe: 'response'
}
).pipe(
    map(res => res.status),
    catchError(this.handleError)
);
}

getArticleById(articleId: string): Observable<Article> {
  return this.http.get<Article>(this.articleUrl + "/" + articleId).pipe(
      tap(article => console.log(article.title + " " + article.category)),
      catchError(this.handleError)
  );
}

updateArticle(article: Article): Observable<number> {
  let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
  });
  return this.http.put<Article>(this.articleUrl + "/" + article.id, article, {
      headers: httpHeaders,
      observe: 'response'
  }
  ).pipe(
      map(res => res.status),
      catchError(this.handleError)
  );
}
deleteArticleById(articleId: string): Observable<number> {
  return this.http.delete<number>(this.articleUrl + "/" + articleId).pipe(
      tap(status => console.log("status: " + status)),
      catchError(this.handleError)
  );
}
private handleError(error: any) {
  console.error(error);
  return throwError(error);
}
}


