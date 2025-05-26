
import {Component, inject} from '@angular/core';
import {InputSearchComponent} from "../input-search/input-search.component";
import {GitHubRepo, GitHubUserShort, UsersService} from "../../service/users.service";
import {RouterLink} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    InputSearchComponent,
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  users: GitHubUserShort[] = []
  repository: GitHubRepo[] =[]
  total = 0;
  page = 1;
  query = "";
  searched = false;
  searchType: 'users' | 'repository' = 'users';

  usersService = inject(UsersService);

  handleSearch(query: string) {
    this.page = 1;
    this.query = query;
    this.searchUsers()
  }

  changePage(direction: number) {
    this.page += direction;
    this.searchUsers()
  }

  changeLanguageColor(language: string){
   
    switch(language) {
      case 'JavaScript':
            return 'color-js';
        case 'Python':
            return 'color-python';
        case 'Java':
            return 'color-java';
        case 'C':
            return 'color-csharp';
        case 'Jupyter Notebook':
            return 'color-jupyter'
        case 'Go':
            return 'color-go'
        default:
            return 'color-default';
    }
  }

  searchUsers() {
    if(!this.query) return;

    if(this.searchType === 'users') {
       this.usersService.searchUsers(this.query, this.page).subscribe({
      next: (res) => {
        this.users = res.items;
        this.total = res.total_count;
        this.searched = true;
      },
      error: (err) => {
        this.users = [];
        this.total = 0;
        this.searched = false;
      }
    })
    }else {
      this.usersService.searchRepository(this.query, this.page).subscribe({
         next: (res) => {
        this.repository = res.items;
        this.total = res.total_count;
        this.searched = true;
      },
      error: (err) => {
        this.repository = [];
        this.total = 0;
        this.searched = false;
      }
      })
    }
  }
}
