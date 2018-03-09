import { NgModule, Component, Input, Output, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  template:  `<input *ngIf="showFileNameInput" id="uploadFile" class="upload-file form-control" placeholder="Choose File" [(ngModel)]="selectedFileName" disabled="disabled" />
                <div class="fileUpload btn btn-primary">
                    <span>{{uploadButtonText}}</span>
                    <input type="file" class="upload" accept="*" (change)="changeListener($event)">
                </div>`,
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
  @Input() showFileNameInput: boolean;
  @Input() uploadButtonText: string;

  writeValue(value: any) {
    // Handle write value
  }
  propagateChange = (_: any) => { };
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() { }

  changeListener($event): void {
    // debugger; // uncomment this for debugging purposes
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    // debugger; // uncomment this for debugging purposes
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.propagateChange(myReader.result);
      this.selectedFileName = file.name;
    };
    myReader.readAsDataURL(file);
  }
}

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [FormsModule],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
