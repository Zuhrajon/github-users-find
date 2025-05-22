import { Component, inject } from '@angular/core';
import { InputSearchComponent } from "../input-search/input-search.component";
import {  UsersService } from '../../service/users.service';

@Component({
  selector: 'app-repository-table',
  standalone: true,
  imports: [InputSearchComponent],
  templateUrl: './repository-table.component.html',
  styleUrl: './repository-table.component.scss'
})
export class RepositoryTableComponent {
  repository: any[] = []
  total = 0;
  page = 1;
  query = "";
  searched = false;

  usersService = inject(UsersService);

  handleSearchRepository(query: string) {
    this.page = 1;
    this.query = query;
    this.searchRepository()
  }

  changePageRepository(direction: number) {
    this.page += direction;
    this.searchRepository()
  }

  searchRepository() {
    if(!this.query) return;

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
