# @qlack/form-validation

This library is responsible for showing back-end validation errors in reactive forms.

# Back-end validation setup

Back end DTO should be annotated with javax.validation.constraints annotations as can be seen in
 the following example. 
 Validating nested objects is also supported (eg. ExtraInfoDTO).

```java
package com.eurodyn.qlack.baseapplication.dto;

// ..
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
// ..
public class UserDTO extends BaseDTO {

  @Email
  String email;
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W\\_])[A-Za-z\\d\\W\\_]{8,}$")
  String password;
  @Length(min=10, max = 60)
  String firstname;
  @Length(min=10, max = 60)
  String lastname;
  @ReadOnlyProperty
  @NotNull
  byte status;
  @Valid
  private ExtraInfoDTO extraInfo;

}
```

In your controller you have to add the javax.validation.Valid annotation to the object that you
 want to validate.

```java
import javax.validation.Valid;
//..
public class UserController { 
//..
@PostMapping
  public void upload(@Valid @RequestBody UserDTO userDTO) {
    userService.upload(userDTO);
  }
}
```

Finally you must add an ExceptionHandler for MethodArgumentNotValidException errors so that the
 desired format is passed to frontend.
 
 ```java
import com.eurodyn.qlack.util.data.filter.JSONFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ExceptionControllerAdvisor {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity handleValidationException(MethodArgumentNotValidException exception) {
    return new ResponseEntity<>(JSONFilter.filterDefault(exception.getBindingResult().getAllErrors(), "defaultMessage,objectName,field,rejectedValue,code"),
        HttpStatus.BAD_REQUEST);
  }
}
```

# Installation

You need to install the npm module:

```
npm install @qlack/form-validation
```

# Usage

#### 1. Import the `QLACKFormValidationModule`:

 You have to import `QLACKFormValidationModule` in the root NgModule of your application.

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {QLACKFormValidationModule} from '@qlack/form-validation';

@NgModule({
    imports: [
        BrowserModule,
        QLACKFormValidationModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 2. Init the `QLACKFormValidationService` for your application:

```ts
import {Component} from '@angular/core';
import {QLACKTypescriptFormValidationService} from '@qlack/form-validation';

@Component({
    selector: 'test-selector',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
    `
})
export class TestComponent {
    constructor( private validationService: QLACKTypescriptFormValidationService) {}
}
```

#### 3. Pass all needed arguments to the validation service.

This library reads the validation errors that are returned from the backend validation and
 invalidates the form. So it needs the following two arguments: 
 
 ```
   1. The form that will be marked as invalid.
   2. The validation errors.
 ```

The library expects validation errors in the following format: 

```json
 [{
 		"defaultMessage": "length must be between 10 and 60",
 		"objectName": "userDTO",
 		"field": "lastname",
 		"rejectedValue": "Short",
 		"code": "Length"
 	},
 	{
 		"defaultMessage": "must be greater than or equal to 18",
 		"objectName": "userDTO",
 		"field": "extraInfo.age",
 		"rejectedValue": 1,
 		"code": "Min"
 	}
 ]
```

 Use of service:
 
 ```ts
   save() {
       this.userService.save(this.qForms.cleanupForm(this.form)).subscribe(onNext => {
             //..
             }, error => {
               if (error.status == 400) {
                 let validationErrors = error.error;
                 if (error.error) {
                   this.translateService.use('el');
                   this.validationService.validateForm(this.form, validationErrors, this.translateService);
                 } else {
                   //..
                 }
               } else {
                 //..
               }
             });
     }
 ``` 
  Validation service will invalidate the form control that has an error and add a message to show
  . This can be used in the html of the component to style the invalid control and show a message
   to the user.
   In the following example a mat-icon is added when the email is invalid.
  
```html
  <mat-form-field>
    <input matInput placeholder="Email" formControlName="email" autocomplete="username email">
    <mat-icon matSuffix color="warn" *ngIf="form.controls['email'].invalid && form.controls['email'].dirty"
        matTooltip="{{form.controls['email'].getError('message')}}" 
        matTooltipPosition="above" matTooltipClass="error-tooltip">
        {{'warning'}}
    </mat-icon>
  </mat-form-field>
```

####  4. Translate the validation messages.
 
 This library supports translating the validation messages. In order to translate the messages
 , users of the library should pass a translation service to QLACKTypescriptFormValidationService
 .validateForm method. 
 The translation key is of the following format "code.objectName.field". eg (Length.userDTO
 .lastname).<br>
 Note that when dealing with nested objects, the <field> attribute of the error has the nested
  hierarchy eg. (Min.userDTO.extraInfo.age). <br>
  If a translation is not found, then the default message is used.
