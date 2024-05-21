import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductComponentComponent } from './all-product-component.component';

describe('AllProductComponentComponent', () => {
  let component: AllProductComponentComponent;
  let fixture: ComponentFixture<AllProductComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
