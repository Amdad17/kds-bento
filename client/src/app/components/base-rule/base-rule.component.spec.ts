import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRuleComponent } from './base-rule.component';

describe('BaseRuleComponent', () => {
  let component: BaseRuleComponent;
  let fixture: ComponentFixture<BaseRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseRuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
