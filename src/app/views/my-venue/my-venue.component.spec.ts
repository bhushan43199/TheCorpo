import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVenueComponent } from './my-venue.component';

describe('MyVenueComponent', () => {
  let component: MyVenueComponent;
  let fixture: ComponentFixture<MyVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
