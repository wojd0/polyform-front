import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CreatorEffects } from './creator.effects';

describe('CreatorEffects', () => {
  let actions$: Observable<any>;
  let effects: CreatorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreatorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CreatorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
