import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneFigureFormComponent } from './one-figure-form.component';

describe('OneFigureFormComponent', () => {
  let component: OneFigureFormComponent;
  let fixture: ComponentFixture<OneFigureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneFigureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneFigureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
