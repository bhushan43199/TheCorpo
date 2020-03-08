import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeadingInboxMailComponent } from './beading-inbox-mail.component';

describe('BeadingInboxMailComponent', () => {
  let component: BeadingInboxMailComponent;
  let fixture: ComponentFixture<BeadingInboxMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeadingInboxMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeadingInboxMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
