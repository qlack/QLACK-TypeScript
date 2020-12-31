import { TestBed } from '@angular/core/testing';
import {QFormValidationService} from './form-validation.service';

describe('QFormValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QFormValidationService = TestBed.get(QFormValidationService);
    expect(service).toBeTruthy();
  });
});
