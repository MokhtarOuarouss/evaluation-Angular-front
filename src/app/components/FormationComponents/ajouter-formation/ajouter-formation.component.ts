import { Component } from '@angular/core';
import { Formation } from '../../../model/Formation';
import { FormationService } from '../../../service/formationService.service';
import {FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ajouter-formation',
  standalone:true,
  imports:[
    FormsModule,
    NgIf
  ],
  templateUrl: './ajouter-formation.component.html',
  styleUrls: ['./ajouter-formation.component.css'] // Corrected property name
})
export class AjouterFormationComponent {
  id!: number;
  titre!: string;
  description!: string;
  dateDebut !: Date ;
  dateFin !: Date;
  submitted :boolean = false;
  DateProblemMessage: string = '';


  

  constructor(private formationService: FormationService,private router: Router) {}

  checkDatesValidity(): boolean {
      return this.dateDebut < this.dateFin;
  }


  onSubmit(): void {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 1000);
    if (this.titre && this.description && this.dateDebut && this.dateFin) {
      if( this.checkDatesValidity() ){
      const formation: Formation = {
        id: null,
        titre: this.titre,
        description: this.description,
        dateDebut: this.dateDebut,
        dateFin: this.dateFin
      };
  
      this.formationService.addFormation(formation)
        .subscribe(() => {
          this.router.navigateByUrl('/');
          alert('Formation ajoutée avec succès.');
          
        }, error => {
          console.error('Erreur lors de l\'ajout de la formation :', error);
        });
      }
      else{
        this.DateProblemMessage = 'Date de Fin devrait être Apres date debut.';
        setTimeout(() => {
          this.DateProblemMessage = '';
        }, 2000);
      }
    }
  }

}
