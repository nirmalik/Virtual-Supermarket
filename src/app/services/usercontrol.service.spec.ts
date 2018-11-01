import { TestBed, inject } from '@angular/core/testing';

import { UsercontrolService } from './usercontrol.service';

describe('UsercontrolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsercontrolService]
    });
  });

  it('should be created', inject([UsercontrolService], (service: UsercontrolService) => {
    expect(service).toBeTruthy();
  }));
});
