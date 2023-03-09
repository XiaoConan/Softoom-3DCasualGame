import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaleCharacterComponent } from './male-character.component';

describe('MaleCharacterComponent', () => {
  let component: MaleCharacterComponent;
  let fixture: ComponentFixture<MaleCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaleCharacterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaleCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
