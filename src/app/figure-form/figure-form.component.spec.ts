import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureFormComponent } from './figure-form.component';

describe('FigureFormComponent', () => {
  let component: FigureFormComponent;
  let fixture: ComponentFixture<FigureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
