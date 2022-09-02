import { TestBed } from '@angular/core/testing';

import { ChangesGuard } from './changes.guard';

describe('ChangesGuard', () => {
  let guard: ChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
