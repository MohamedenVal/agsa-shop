import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartIconsComponent } from './cart-icons.component';

describe('CartIconsComponent', () => {
  let component: CartIconsComponent;
  let fixture: ComponentFixture<CartIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
