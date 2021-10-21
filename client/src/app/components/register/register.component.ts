import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { PasswordValidator } from '../../shared/password.validator';
import {RegistrationService} from "../../service/registration.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [null,[Validators.required, Validators.minLength(2)]],
      lastName: ['',[Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },{validator: PasswordValidator});
  }
  /* Getter for form controls */
  get firstName() {
    return this.registrationForm.controls.firstName;
  }
  get lastName() {
    return this.registrationForm.controls.lastName;
  }
  get email() {
    return this.registrationForm.controls.email;
  }
  get password() {
    return this.registrationForm.controls.password;
  }
  get confirmPassword() {
    return this.registrationForm.controls.confirmPassword;
  }

  /* Registration submit method*/
  onSubmit() {
    console.log(this.registrationForm.value);
    this.registrationService.registerUser(this.registrationForm.value).subscribe(data => {
      console.table(data)
    },(error => {
      console.log('Something went wrong!');
      })

    );
  }

}
