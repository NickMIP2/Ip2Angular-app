import { TestBed, inject } from '@angular/core/testing';

import { ThemeDataService } from './theme-data.service';

describe('ThemeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeDataService]
    });
  });

  it('should be created', inject([ThemeDataService], (service: ThemeDataService) => {
    expect(service).toBeTruthy();
  }));
});
