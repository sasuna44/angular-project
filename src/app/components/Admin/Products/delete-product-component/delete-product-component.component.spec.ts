import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductComponentComponent } from './delete-product-component.component';

describe('DeleteProductComponentComponent', () => {
  let component: DeleteProductComponentComponent;
  let fixture: ComponentFixture<DeleteProductComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
