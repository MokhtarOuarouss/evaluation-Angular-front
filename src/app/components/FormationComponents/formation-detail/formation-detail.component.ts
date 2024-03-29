import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from '../../../model/Formation';
import { CommonModule } from '@angular/common';
import { FormationService } from '../../../service/formationService.service';
import { ListParticipantsComponent } from '../../ParticipantComponents/list-participants/list-participants.component';
import { Participant } from '../../../model/Participant';

@Component({
  selector: 'app-formation-detail',
  standalone: true,
  imports: [
    ListParticipantsComponent,
    CommonModule
  ],
  templateUrl: './formation-detail.component.html',
  styleUrl: './formation-detail.component.css'
})
export class FormationDetailComponent {
  formationId!: number | null;
  formation: Formation | undefined;
  participants: Participant[] = [];

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    this.getFormationById();
  }

  getFormationById() {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.formationService.getFormationById(id).subscribe(formation => {
        this.formation = formation;
        this.formationId = formation.id; 
        this.getParticipantsForFormation(this.formationId);
      });
    });
  }

  getParticipantsForFormation(formationId: number | null) {
    this.formationService.getAllParticipantsForFormation(formationId).subscribe(participants => {
      this.participants = participants;
    });
  }
}
