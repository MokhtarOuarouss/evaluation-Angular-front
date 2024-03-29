import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Participant } from '../../../model/Participant';
import { ParticipantService } from '../../../service/participantService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-participant',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './ajouter-participant.component.html',
  styleUrl: './ajouter-participant.component.css'
})
export class AjouterParticipantComponent {

  name!:string;
  email!:string;
  submitted : boolean = false;
  problemMessage !: string;

  constructor(private participantService : ParticipantService ){} 

  onSubmit(): void {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 1000);
    if (this.name && this.email) {
      
      const participant: Participant = {
        id: null,
        name: this.name,
        email: this.email,
        nbrFormations : null
      };
  
      this.participantService.addParticipant(participant)
        .subscribe(() => {
          alert('Participant ajoutée avec succès.');
          window.location.reload();

          
        }, error => {
          console.error('Erreur lors de l\'ajout du participant :', error);
        });
    }
  }

}
