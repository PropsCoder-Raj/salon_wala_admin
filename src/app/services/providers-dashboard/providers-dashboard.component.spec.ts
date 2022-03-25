import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersDashboardComponent } from './providers-dashboard.component';

describe('ProvidersDashboardComponent', () => {
  let component: ProvidersDashboardComponent;
  let fixture: ComponentFixture<ProvidersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
