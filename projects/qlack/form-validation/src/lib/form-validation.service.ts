import {Injectable} from '@angular/core';
import {AbstractControl, UntypedFormArray, UntypedFormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QFormValidationService {

  constructor() {
  }

  public validateForm(theForm: UntypedFormGroup, validationErrors: any, translateService?: any) {
    validationErrors.forEach((validationError: any) => {
      let originalErrorMessage = validationError.defaultMessage;
      if (translateService) {
        let uniqueErrorCode = validationError.code + "." + validationError.objectName + "." + validationError.field;
        translateService.get(uniqueErrorCode).subscribe(
            (translatedErrorMessage: string) =>
                this.invalidateFormControl(theForm, validationError,
                    translatedErrorMessage === uniqueErrorCode ? originalErrorMessage : translatedErrorMessage),
            (error: any) =>
                this.invalidateFormControl(theForm, validationError, originalErrorMessage))
      } else {
        this.invalidateFormControl(theForm, validationError, originalErrorMessage);
      }
    })
  }

  private invalidateFormControl(theForm: UntypedFormGroup, validationError: any, errorMSG: string) {
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
          let formArrayElement = <UntypedFormArray>fieldFormControl.get(parsedArrayField.array);
          fieldFormControl = formArrayElement.at(parsedArrayField.index);
        } else {
          fieldFormControl = fieldFormControl.get(fields[i])!;
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

  private getArrayControl(theForm: UntypedFormGroup, parsedArrayField: any): AbstractControl {
    let formArrayElement = <UntypedFormArray>theForm.controls[parsedArrayField.array];
    return formArrayElement.at(parsedArrayField.index);
  }
}
