import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWorksNoteComponent } from './how-works-note.component';

describe('HowWorksNoteComponent', () => {
  let component: HowWorksNoteComponent;
  let fixture: ComponentFixture<HowWorksNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowWorksNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowWorksNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
