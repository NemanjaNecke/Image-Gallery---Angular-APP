import { TestBed } from '@angular/core/testing';

import { RegistrationGuardGuard } from './registration-guard.guard';

describe('RegistrationGuardGuard', () => {
  let guard: RegistrationGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegistrationGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
