import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

;

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
      fieldFormControl = theForm.controls[fields[0]];
      for (let i = 1; i < fields.length; i++) {
        fieldFormControl = fieldFormControl.get(fields[i]);
      }
    } else {
      fieldFormControl = theForm.controls[erroneousField];
    }
    fieldFormControl.setErrors({'incorrect': true, 'message': errorMSG});
  }
}
