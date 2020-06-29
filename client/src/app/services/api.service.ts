import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UrlResponse {
  url: string
}

interface CodeResponse {
  code: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  public getUrl(): Observable<UrlResponse> {
    return this.http.get<UrlResponse>(`${environment.apiUrl}/links/${this.router.url.slice(1)}`);
  }

  public getShortUrl(link: string): Observable<CodeResponse> {
    return this.http.post<CodeResponse>(`${environment.apiUrl}/links`, {link: link});
  }
}
