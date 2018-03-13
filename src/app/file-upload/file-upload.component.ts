import { Component, Input, Output, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  template:  `<input id="file-upload" type="file" (change)="changeListener($event)"/>
  <!--<button type="button" md-button (click)="imgFileInput.click()">Add a photo</button>
  <input hidden type="file" #imgFileInput (change)="changeListener($event)"/>-->`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  selectedFileName: string = null;

  writeValue(value: any) {
// Handle write value
  }
  propagateChange = (_: any) => { };
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() { }

  changeListener($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.propagateChange(myReader.result);
      this.selectedFileName = file.name;
    };
    myReader.readAsDataURL(file);
  }
}


