import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideOptionCardComponent } from './override-option-card.component';

describe('OverrideOptionCardComponent', () => {
  let component: OverrideOptionCardComponent;
  let fixture: ComponentFixture<OverrideOptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverrideOptionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverrideOptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
