import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProject } from './modal-project';

describe('ModalProject', () => {
  let component: ModalProject;
  let fixture: ComponentFixture<ModalProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
