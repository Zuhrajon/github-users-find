
import {Component, inject} from '@angular/core';
import {InputSearchComponent} from "../input-search/input-search.component";
import {GitHubUserShort, UsersService} from "../../service/users.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    InputSearchComponent,
    RouterLink
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  users: GitHubUserShort[] = []
  total = 0;
  page = 1;
  query = "";
  searched = false;

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

  searchUsers() {
    if(!this.query) return;

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
  }
}
