import { TestBed } from '@angular/core/testing';

import { documentService } from './doc-control-service.service';

describe('documentService', () => {
  let service: documentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(documentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
