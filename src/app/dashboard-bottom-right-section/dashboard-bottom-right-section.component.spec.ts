import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBottomRightSectionComponent } from './dashboard-bottom-right-section.component';

describe('DashboardBottomRightSectionComponent', () => {
  let component: DashboardBottomRightSectionComponent;
  let fixture: ComponentFixture<DashboardBottomRightSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardBottomRightSectionComponent]
    });
    fixture = TestBed.createComponent(DashboardBottomRightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
