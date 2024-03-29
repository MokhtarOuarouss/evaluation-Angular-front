import { Component, Input, OnInit } from '@angular/core';
import { Participant } from '../../../model/Participant';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../bare_recherche/bare-recherche.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ParticipantService } from '../../../service/participantService.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-list-participants',
  standalone: true,
  imports: [
    SearchBarComponent,
    NgFor,
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './list-participants.component.html',
  styleUrl: './list-participants.component.css'
})
export class ListParticipantsComponent implements OnInit{
  @Input() participants: Participant[] = [];
  @Input() formationId: number | null = 0;
  searchName: string = '';


  modalRef: NgbModalRef | null = null;
  AllParticipants : Participant[] = [];
  selectedParticipant !: Participant;



  constructor(private participantService : ParticipantService,
    private modalService: NgbModal){
    
  }

  ngOnInit(): void {
    this.getAllParticipants();
  }

  openModal(content: any): void {
    this.modalRef = this.modalService.open(content);
  }

  getAllParticipants(): void {
    this.participantService.getAllParticipants()
      .subscribe(AllParticipants => this.AllParticipants = AllParticipants);
  }

  removeParticipantFromFormation(idParticipant: number | null) : void{
    if (confirm("Confirmer la suppression du participant dans cette formation ?")) {
      this.participantService.removeParticipantFromFormation(idParticipant,this.formationId)
        .subscribe(() => {
          window.location.reload();
        });
    }
  }

  

  addParticipantToFormation(): void {
    if (this.selectedParticipant) {
      this.participantService.addParticipantToFormation(this.selectedParticipant.id, this.formationId)
        .subscribe(() => {
          alert('participant selectioner')
          this.modalRef?.close(); 
          window.location.reload();

        });
    }
  }

}
