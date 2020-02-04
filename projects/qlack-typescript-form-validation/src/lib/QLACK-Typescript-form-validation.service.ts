import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QLACKTypescriptFormValidationService {

  constructor() {
  }

  public validateForm(theForm: FormGroup, validationErrors: any, translateService?: any) {
    validationErrors.forEach(validationError => {
      let originalErrorMessage = validationError.defaultMessage;
      if (translateService) {
        let uniqueErrorCode = validationError.code + "." + validationError.objectName + "." + validationError.field;
        translateService.get(uniqueErrorCode).subscribe(
          translatedErrorMessage =>
            this.invalidateFormControl(theForm, validationError,
              translatedErrorMessage === uniqueErrorCode ? originalErrorMessage : translatedErrorMessage),
          error => this.invalidateFormControl(theForm, validationError, originalErrorMessage))
      } else {
        this.invalidateFormControl(theForm, validationError, originalErrorMessage);
      }
    })
  }

  private invalidateFormControl(theForm: FormGroup, validationError: any, errorMSG: string) {
    let erroneousField = validationError.field;
    let fieldFormControl: AbstractControl;

    if (erroneousField.includes('.')) {
      let fields = erroneousField.split('.');
      let parentField = fields[0];

      if (parentField.includes('[')) {
        let parsedArrayField = this.parseArrayField(erroneousField);
        fieldFormControl = this.getArrayControl(theForm, parsedArrayField);
      } else {
        fieldFormControl = theForm.controls[parentField];
      }

      for (let i = 1; i < fields.length; i++) {
        if (fields[i].includes("[")) {
          let parsedArrayField = this.parseArrayField(fields[i]);
          let formArrayElement = <FormArray> fieldFormControl.get(parsedArrayField.array);
          fieldFormControl = formArrayElement.at(parsedArrayField.index);
        } else {
          fieldFormControl = fieldFormControl.get(fields[i]);
        }
      }

    } else if (erroneousField.includes('[')) {
      let parsedArrayField = this.parseArrayField(erroneousField);
      fieldFormControl = this.getArrayControl(theForm, parsedArrayField);
    } else {
      fieldFormControl = theForm.controls[erroneousField];
    }
    fieldFormControl.setErrors({'incorrect': true, 'message': errorMSG});
  }

  private parseArrayField(erroneousField: any) {
    let strings = erroneousField.split('[');
    let index = strings[1].substr(0, 1);

    return {
      "array": strings[0],
      "index": index
    };
  }

  private getArrayControl(theForm: FormGroup, parsedArrayField: any): AbstractControl {
    let formArrayElement = <FormArray> theForm.controls[parsedArrayField.array];
    return formArrayElement.at(parsedArrayField.index);
  }
}
