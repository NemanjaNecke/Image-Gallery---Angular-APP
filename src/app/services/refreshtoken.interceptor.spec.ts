import { TestBed } from '@angular/core/testing';

import { RefreshtokenInterceptor } from './refreshtoken.interceptor';

describe('RefreshtokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RefreshtokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RefreshtokenInterceptor = TestBed.inject(RefreshtokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
