import { TestBed, inject } from '@angular/core/testing';

import { ImageB64ConvertService } from './image-b64-convert.service';

describe('ImageB64ConvertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageB64ConvertService]
    });
  });

  it('should be created', inject([ImageB64ConvertService], (service: ImageB64ConvertService) => {
    expect(service).toBeTruthy();
  }));
});
