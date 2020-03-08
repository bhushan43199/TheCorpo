import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueProviderComponent } from './venue-provider.component';

describe('VenueProviderComponent', () => {
  let component: VenueProviderComponent;
  let fixture: ComponentFixture<VenueProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
