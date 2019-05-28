import { TestBed } from '@angular/core/testing';

import { RestproviderService } from './restprovider.service';

describe('RestproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestproviderService = TestBed.get(RestproviderService);
    expect(service).toBeTruthy();
  });
});
