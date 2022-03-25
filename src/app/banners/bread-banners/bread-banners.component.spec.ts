import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadBannersComponent } from './bread-banners.component';

describe('BreadBannersComponent', () => {
  let component: BreadBannersComponent;
  let fixture: ComponentFixture<BreadBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadBannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
