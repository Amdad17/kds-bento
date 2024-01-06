import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeingPreparingComponent } from './being-preparing.component';

describe('BeingPreparingComponent', () => {
  let component: BeingPreparingComponent;
  let fixture: ComponentFixture<BeingPreparingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeingPreparingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeingPreparingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
