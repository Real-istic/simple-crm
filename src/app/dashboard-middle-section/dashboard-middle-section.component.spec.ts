import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMiddleSectionComponent } from './dashboard-middle-section.component';

describe('DashboardMiddleSectionComponent', () => {
  let component: DashboardMiddleSectionComponent;
  let fixture: ComponentFixture<DashboardMiddleSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMiddleSectionComponent]
    });
    fixture = TestBed.createComponent(DashboardMiddleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
