import { TestBed } from '@angular/core/testing';

import { MessagesCrudService } from './messages-crud.service';

describe('MessagesCrudService', () => {
  let service: MessagesCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
