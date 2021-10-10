import { TestBed } from '@angular/core/testing';

import { HttpAuthBearerInterceptor } from './http-auth-bearer.interceptor';

describe('HttpAuthBearerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpAuthBearerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpAuthBearerInterceptor = TestBed.inject(HttpAuthBearerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
