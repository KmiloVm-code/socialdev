import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProfile } from './modal-profile';

describe('ModalProfile', () => {
  let component: ModalProfile;
  let fixture: ComponentFixture<ModalProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
