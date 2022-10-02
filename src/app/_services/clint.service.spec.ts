/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ClintService } from './clint.service';

describe('Service: Clint', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClintService]
    });
  });

  it('should ...', inject([ClintService], (service: ClintService) => {
    expect(service).toBeTruthy();
  }));
});
