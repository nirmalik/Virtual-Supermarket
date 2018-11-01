import { TestBed, async, inject } from '@angular/core/testing';

import { AdminStoreGuard } from './admin-store.guard';

describe('AdminStoreGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminStoreGuard]
    });
  });

  it('should ...', inject([AdminStoreGuard], (guard: AdminStoreGuard) => {
    expect(guard).toBeTruthy();
  }));
});
