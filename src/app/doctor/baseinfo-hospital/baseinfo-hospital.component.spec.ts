import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseinfoHospitalComponent } from './baseinfo-hospital.component';

describe('BaseinfoHospitalComponent', () => {
  let component: BaseinfoHospitalComponent;
  let fixture: ComponentFixture<BaseinfoHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseinfoHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseinfoHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
