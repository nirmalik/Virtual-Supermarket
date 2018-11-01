import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCartEmptyComponent } from './dialog-cart-empty.component';

describe('DialogCartEmptyComponent', () => {
  let component: DialogCartEmptyComponent;
  let fixture: ComponentFixture<DialogCartEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCartEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCartEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
