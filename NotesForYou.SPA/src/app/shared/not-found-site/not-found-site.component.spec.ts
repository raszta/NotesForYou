import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundSiteComponent } from './not-found-site.component';

describe('NotFoundSiteComponent', () => {
  let component: NotFoundSiteComponent;
  let fixture: ComponentFixture<NotFoundSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
