import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvoCategoriesComponent } from './evo-categories.component';

describe('EvoCategoriesComponent', () => {
  let component: EvoCategoriesComponent;
  let fixture: ComponentFixture<EvoCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvoCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvoCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
