# @qlack/form-validation
`Angular support: 12.2.12`

This library allows you to bind Java back-end validation messages (JSR 380) to your Angular reactive forms.

## Back-end validation setup

The back-end DTO should be annotated with `javax.validation.constraints` annotations as can be seen in
 the following example. 
 Validating nested objects is also supported (eg. `ExtraInfoDTO`).

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

In your controller you have to add the `javax.validation.Valid` annotation to the object that you
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

The last piece you need is some code that converts your back-end validation errors to a structure that can be understood by this library. This code is provided as a Spring Boot RestControllerAdvice in QLACK Util validation project. You only need to include qlack-util-validation in your dependencies.

## Library installation

You need to install the npm module:

```
npm install @qlack/form-validation
```

## Usage

### Import the `QFormValidationModule`:

 You have to import `QFormValidationModule` in the root NgModule of your application.

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {QFormValidationModule} from '@qlack/form-validation';

@NgModule({
    providers: [
        ...
        QFormValidationModule
    ]
})
export class AppModule { }
```

### Inject the `QFormValidationService` where you intend to use it:

```ts
import {Component} from '@angular/core';
import {QFormValidationService} from '@qlack/form-validation';

@Component({
    selector: 'test-selector',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent {
    constructor( private validationService: QFormValidationService) {}
}
```

### Example
![](doc/validation.png)  
*A validation error depicted as a tooltip on the warning/triangle icon*

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
Validation service will invalidate the form control that has an error and add a message to show.
This can be used in the html of the component to style the invalid control and show a message to
the user. In the following example a mat-icon is added when the email is invalid.
  
```html
  <mat-form-field>
    <input matInput placeholder="Email" formControlName="email" autocomplete="username email">
    <mat-icon matSuffix color="warn" *ngIf="form.controls['email'].invalid && form.controls['email'].dirty"
        matTooltip="{{form.controls['email'].getError('message')}}" 
        matTooltipPosition="above" matTooltipClass="error-tooltip">warning</mat-icon>
  </mat-form-field>
```

###  Internationalisation support
The library supports translating the validation messages. In order to translate the messages you
should pass a translation service to `QFormValidationService.validateForm` method.  The
translation key is of the following format `code.objectName.field`, e.g. `Length.userDTO
 .lastname`. 

Note that when dealing with nested objects, the `<field>` attribute of the error message depicts
the entire nested hierarchy, e.g. `Min.userDTO.extraInfo.age` to allow to properly locate it. 
If a translation is not found, the default Java validation message is used.
