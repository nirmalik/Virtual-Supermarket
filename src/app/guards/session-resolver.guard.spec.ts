import { TestBed, async, inject } from '@angular/core/testing';

import { SessionResolverGuard } from './session-resolver.guard';

describe('SessionResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionResolverGuard]
    });
  });

  it('should ...', inject([SessionResolverGuard], (guard: SessionResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
