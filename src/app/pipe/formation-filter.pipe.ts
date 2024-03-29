import { Pipe, PipeTransform } from '@angular/core';
import { Formation } from '../model/Formation';

@Pipe({
  name: 'formationFilter',
  standalone: true
})
export class FormationFilterPipe implements PipeTransform {

  transform(formations: Array<Formation>, searchtext: string): Array<Formation> {
    if (searchtext.trim() !== '') {
      return  formations.filter(formation =>
        formation.titre.toLowerCase().includes(searchtext.toLowerCase())
      );
    } else {
      return  formations;
    }
  }

}
