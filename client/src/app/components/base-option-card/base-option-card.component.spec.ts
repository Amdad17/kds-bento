import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseOptionCardComponent } from './base-option-card.component';

describe('BaseOptionCardComponent', () => {
  let component: BaseOptionCardComponent;
  let fixture: ComponentFixture<BaseOptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseOptionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseOptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
