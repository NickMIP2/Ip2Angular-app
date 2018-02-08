import { TestBed, inject } from '@angular/core/testing';

import { ThemeserviceService } from './themeservice.service';

describe('ThemeserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeserviceService]
    });
  });

  it('should be created', inject([ThemeserviceService], (service: ThemeserviceService) => {
    expect(service).toBeTruthy();
  }));
});
