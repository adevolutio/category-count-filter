import { TestBed } from '@angular/core/testing';

import { EvoCategoriesService } from './evo-categories.service';

describe('EvoCategoriesService', () => {
  let service: EvoCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvoCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
