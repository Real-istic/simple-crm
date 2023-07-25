import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBottomSectionComponent } from './dashboard-bottom-section.component';

describe('DashboardBottomSectionComponent', () => {
  let component: DashboardBottomSectionComponent;
  let fixture: ComponentFixture<DashboardBottomSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardBottomSectionComponent]
    });
    fixture = TestBed.createComponent(DashboardBottomSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
