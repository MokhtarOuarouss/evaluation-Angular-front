import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../model/Formation'; 
import { Participant } from '../model/Participant';

@Injectable({
    providedIn: 'root'
  })
  export class ParticipantService {
    private apiUrl = 'http://localhost:8082/api/v1/participant'; 
  
    constructor(
      private http: HttpClient    ) { }
  
    

    getAllParticipants(): Observable<Participant[]> {
        return this.http.get<Participant[]>(this.apiUrl);
      }
  
    addParticipant(participant: Participant): Observable<Participant> {
      return this.http.post<Participant>(this.apiUrl, participant);
    }

    getParticipantByName(name: string | undefined): Observable<Formation[]> {
        const params: any = {};
        if (name) {
          params.name = name;
        }
      
        return this.http.get<Formation[]>(`${this.apiUrl}/filter`, { params });
      }

    addParticipantToFormation(participantId: number |null, formationId: number|null): Observable<Participant> {
        const url = `${this.apiUrl}/${participantId}/addFormation/${formationId}`;
        return this.http.post<Participant>(url, null);
    }

    removeParticipantFromFormation(idParticipant: number | null, idFormation: number | null): Observable<void> {
        const url = `${this.apiUrl}/${idParticipant}/removeFormation/${idFormation}`;
        return this.http.delete<void>(url);
    }

    deleteParticipant(id: number|null): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
      }
  
    
  }
  