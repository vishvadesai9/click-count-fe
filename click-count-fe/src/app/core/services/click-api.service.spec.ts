import { TestBed } from '@angular/core/testing';

import { ClickApiService } from './click-api.service';

describe('ClickApiService', () => {
  let service: ClickApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
