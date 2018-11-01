import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCustomerComponent } from './store-customer.component';

describe('StoreCustomerComponent', () => {
  let component: StoreCustomerComponent;
  let fixture: ComponentFixture<StoreCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
