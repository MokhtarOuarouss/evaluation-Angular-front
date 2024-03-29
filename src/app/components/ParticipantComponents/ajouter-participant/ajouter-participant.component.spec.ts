import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterParticipantComponent } from './ajouter-participant.component';

describe('AjouterParticipantComponent', () => {
  let component: AjouterParticipantComponent;
  let fixture: ComponentFixture<AjouterParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterParticipantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
