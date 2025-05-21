import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GitHubUserShort {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubSearchResult {
  total_count: number;
  items: GitHubUserShort[];
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  private userAPI = "https://api.github.com/search/users";

  searchUsers(query: string, page = 1): Observable<GitHubSearchResult> {
    return this.http.get<GitHubSearchResult>(`${this.userAPI}?q=${query}&page=${page}`)
  }
 
}
