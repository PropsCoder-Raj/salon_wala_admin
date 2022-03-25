import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCityComponent } from './bread-city.component';

describe('BreadCityComponent', () => {
  let component: BreadCityComponent;
  let fixture: ComponentFixture<BreadCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
