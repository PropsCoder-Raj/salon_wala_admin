import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadProviderComponent } from './bread-provider.component';

describe('BreadProviderComponent', () => {
  let component: BreadProviderComponent;
  let fixture: ComponentFixture<BreadProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
