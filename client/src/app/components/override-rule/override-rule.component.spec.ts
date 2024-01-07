import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideRuleComponent } from './override-rule.component';

describe('OverrideRuleComponent', () => {
  let component: OverrideRuleComponent;
  let fixture: ComponentFixture<OverrideRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverrideRuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverrideRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
