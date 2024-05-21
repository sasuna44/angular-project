import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersComponentComponent } from './all-orders-component.component';

describe('AllOrdersComponentComponent', () => {
  let component: AllOrdersComponentComponent;
  let fixture: ComponentFixture<AllOrdersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOrdersComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllOrdersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
