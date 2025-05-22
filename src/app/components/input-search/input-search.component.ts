import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {
  @Output() search = new EventEmitter<string>();
  @Output() searchRepository = new EventEmitter<string>();

  query= "";
  queryRep= "";
  

  onSearch() {
    console.log("result4");
    
    this.search.emit(this.query.trim());
  }

  onSearchRepository() {
    console.log("result2");
    
    this.searchRepository.emit(this.queryRep.trim());
  }
  
}
