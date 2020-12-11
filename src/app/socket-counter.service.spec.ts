import { TestBed } from '@angular/core/testing';

import { SocketCounterService } from './socket-counter.service';

describe('SocketCounterService', () => {
  let service: SocketCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
