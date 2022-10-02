/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ShardService } from './shard.service';

describe('Service: Shard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShardService]
    });
  });

  it('should ...', inject([ShardService], (service: ShardService) => {
    expect(service).toBeTruthy();
  }));
});
