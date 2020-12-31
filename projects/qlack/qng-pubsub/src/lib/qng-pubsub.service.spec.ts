import { TestBed } from '@angular/core/testing';

import { QNgPubSubService } from './qng-pubsub.service';

describe('QNgPubSubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QNgPubSubService = TestBed.get(QNgPubSubService);
    expect(service).toBeTruthy();
  });
});
