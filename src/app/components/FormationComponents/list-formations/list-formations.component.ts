import { Component , OnInit} from '@angular/core';
import { Formation } from '../../../model/Formation';
import { FormationService } from '../../../service/formationService.service';
import { CommonModule, NgFor } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormationFilterPipe } from '../../../pipe/formation-filter.pipe';
import { SearchBarComponent } from '../../bare_recherche/bare-recherche.component';
@Component({
  selector: 'app-list-formations',
  standalone: true,
  imports: [
    SearchBarComponent,
    NgFor,
    FormsModule,
    CommonModule,
    FormationFilterPipe,
    RouterLink
  ],
  templateUrl: './list-formations.component.html',
  styleUrl: './list-formations.component.css'
})
export class ListeFormationsComponent implements OnInit {
  formations: Formation[] = [];
  formationsfiltred : Formation[]=[];
  searchText: string = '';
  modalRef: NgbModalRef | null = null; 

  id?: number;
  titre?: string;
  description?: string;
  dateDebut!: Date;
  dateFin!: Date;

  
  constructor(private formationService: FormationService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getFormations();
  }

  openModal(content: any): void {
    this.modalRef = this.modalService.open(content);
  }

  checkDatesValidity(dateDebut : Date , dateFin : Date): boolean {
    return dateDebut < dateFin;
 
  }

  getFormations(): void {
    this.formationService.getFormations()
      .subscribe(formations => this.formations = formations);
  }
  updateFormation(id: number | null, formation: Formation): void {
    if (this.checkDatesValidity(formation.dateDebut, formation.dateFin)) {
      this.formationService.updateFormation(id, formation)
        .subscribe(
          updatedFormation => {
            alert('Formation mise à jour avec succès.'); 
            this.getFormations();
            if (this.modalRef) {
              this.modalRef.close();
            }
          }, 
          error => {
            console.error('Erreur lors de la mise à jour de la formation :', error); 
          }
        );
    } else {
      alert('Date de Fin devrait être après la date de début.');    
    }
  }
  



  deleteFormation(id: number | null): void {
    if (id && confirm("Confirmer la suppression de la formation ?")) {
      this.formationService.deleteFormation(id)
        .subscribe(() => {
          console.log('Formation deleted successfully.');

          this.getFormations();
        }, error => {
          console.error('Error deleting formation:', error);
        });
    }
  }

  
  
}
