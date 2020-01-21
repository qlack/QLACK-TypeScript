import { TestBed } from '@angular/core/testing';

import { QLACKTypescriptFormValidationService } from './QLACK-Typescript-form-validation.service';

describe('QLACKAngularFormValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QLACKTypescriptFormValidationService = TestBed.get(QLACKTypescriptFormValidationService);
    expect(service).toBeTruthy();
  });
});
