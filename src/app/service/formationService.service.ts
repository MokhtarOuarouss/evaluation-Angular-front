import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../model/Formation'; 
import { Participant } from '../model/Participant';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8082/api/v1/formation'; 

  constructor(
    private http: HttpClient    ) { }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl);
  }

  getFormationsFilterByTitle(titre: string | undefined): Observable<Formation[]> {
    const params: any = {};
    if (titre) {
      params.titre = titre;
    }
  
    return this.http.get<Formation[]>(`${this.apiUrl}/filter`, { params });
  }

  getAllParticipantsForFormation(id: number | null): Observable<Participant[]> {
    const url = `${this.apiUrl}/${id}/participants`;
    return this.http.get<Participant[]>(url);
  }
  

  getFormationById(id: number|null): Observable<Formation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Formation>(url);
  }

  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(this.apiUrl, formation);
  }

  updateFormation(id:number|null,formation: Formation): Observable<Formation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Formation>(url, formation);
  }

  deleteFormation(id: number|null): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
