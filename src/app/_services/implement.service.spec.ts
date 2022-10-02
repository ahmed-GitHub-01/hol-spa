/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ImplementService } from './implement.service';

describe('Service: Implement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImplementService]
    });
  });

  it('should ...', inject([ImplementService], (service: ImplementService) => {
    expect(service).toBeTruthy();
  }));
});
