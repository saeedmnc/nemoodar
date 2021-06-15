import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLoginPageComponent } from './doctor-login-page.component';

describe('DoctorLoginPageComponent', () => {
  let component: DoctorLoginPageComponent;
  let fixture: ComponentFixture<DoctorLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorLoginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
