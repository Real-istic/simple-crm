import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRightSectionComponent } from './dashboard-top-right-section.component';

describe('DashboardRightSectionComponent', () => {
  let component: DashboardRightSectionComponent;
  let fixture: ComponentFixture<DashboardRightSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRightSectionComponent]
    });
    fixture = TestBed.createComponent(DashboardRightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
