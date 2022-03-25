import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCategoriesComponent } from './bread-categories.component';

describe('BreadCategoriesComponent', () => {
  let component: BreadCategoriesComponent;
  let fixture: ComponentFixture<BreadCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
