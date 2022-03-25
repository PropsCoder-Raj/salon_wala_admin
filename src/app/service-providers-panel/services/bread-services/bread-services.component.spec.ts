import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadServicesComponent } from './bread-services.component';

describe('BreadServicesComponent', () => {
  let component: BreadServicesComponent;
  let fixture: ComponentFixture<BreadServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
