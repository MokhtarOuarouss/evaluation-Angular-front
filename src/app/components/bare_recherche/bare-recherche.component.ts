import { Component, Output ,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormationService } from '../../service/formationService.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './bare-recherche.component.html',
  styleUrl: './bare-recherche.component.css'
})
export class SearchBarComponent {
  @Output() searchTextChange = new EventEmitter<string>();
  searchText: string = '';

  constructor(private formationService: FormationService) {
    
  }

  onSearch(): void {
    this.formationService.getFormationsFilterByTitle(this.searchText)
      .subscribe(formations => {
      }, error => {
        console.error('Error fetching filtered formations:', error);
      });

    this.searchTextChange.emit(this.searchText);
  }

  
}
