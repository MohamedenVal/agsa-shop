import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIconComponent } from './client-icon.component';

describe('ClientIconComponent', () => {
  let component: ClientIconComponent;
  let fixture: ComponentFixture<ClientIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
