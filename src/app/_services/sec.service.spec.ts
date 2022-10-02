/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { SecService } from './sec.service';

describe('Service: Sec', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecService]
    });
  });

  it('should ...', inject([SecService], (service: SecService) => {
    expect(service).toBeTruthy();
  }));
});
