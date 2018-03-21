import { Injectable } from '@angular/core';

@Injectable()
export class ImageB64ConvertService {

  constructor() { }

  convert(base64: string): string {
    const substr = base64.substring(0, 30);
    for (let i = 0; i < substr.length; i++) {
      console.log(substr.charAt(i));
    }
    return '';
  }
}
