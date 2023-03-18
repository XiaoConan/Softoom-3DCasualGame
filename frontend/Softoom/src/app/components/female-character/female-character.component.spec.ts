import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleCharacterComponent } from './female-character.component';

describe('FemaleCharacterComponent', () => {
  let component: FemaleCharacterComponent;
  let fixture: ComponentFixture<FemaleCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FemaleCharacterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FemaleCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
