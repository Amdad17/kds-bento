import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleSetterPageComponent } from './rule-setter-page.component';

describe('RuleSetterPageComponent', () => {
  let component: RuleSetterPageComponent;
  let fixture: ComponentFixture<RuleSetterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuleSetterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuleSetterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
