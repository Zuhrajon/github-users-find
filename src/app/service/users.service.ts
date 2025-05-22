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

export interface GitHubFindRepository {
  login:string;
  repository: string;
  avatar_url: string;
}

export interface GitHubSearchRepository {
  total_count: number;
  items: GitHubFindRepository[];
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
 
  searchRepository(queryRep: string, page = 1): Observable<GitHubSearchRepository> {
    console.log("result1");
    
    return this.http.get<GitHubSearchRepository>(`${this.repositoryAPI}?q=${queryRep}&page=${page}`)
  }
}
