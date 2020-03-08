import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBeadComponent } from './view-bead.component';

describe('ViewBeadComponent', () => {
  let component: ViewBeadComponent;
  let fixture: ComponentFixture<ViewBeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
