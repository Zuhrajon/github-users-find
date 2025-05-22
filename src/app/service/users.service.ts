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


export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface GitHubRepoSearchResult {
  total_count: number;
  items: GitHubRepo[];
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  private userAPI = "https://api.github.com/search/users";
  private repositoryAPI = "https://api.github.com/search/repositories"


  searchUsers(query: string, page = 1): Observable<GitHubSearchResult> {
    console.log("result3");
    
    return this.http.get<GitHubSearchResult>(`${this.userAPI}?q=${query}&page=${page}`)
  }
 
  searchRepository(queryRep: string, page = 1): Observable<GitHubRepoSearchResult> {
    return this.http.get<GitHubRepoSearchResult>(`${this.repositoryAPI}?q=${queryRep}&page=${page}`)
  }
}
