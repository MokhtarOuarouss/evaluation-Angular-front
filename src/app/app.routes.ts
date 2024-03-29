import { Routes } from '@angular/router';
import { AjouterFormationComponent } from './components/FormationComponents/ajouter-formation/ajouter-formation.component';
import { ListeFormationsComponent } from './components/FormationComponents/list-formations/list-formations.component';
import { FormationDetailComponent } from './components/FormationComponents/formation-detail/formation-detail.component';
import { AjouterParticipantComponent } from './components/ParticipantComponents/ajouter-participant/ajouter-participant.component';

export const routes: Routes = [
    {path: "", component: ListeFormationsComponent},
    {path: "ajouter/formation", component: AjouterFormationComponent},
    {path: "formation/:id", component: FormationDetailComponent},
    {path: "ajouter/participant", component: AjouterParticipantComponent},

  ];