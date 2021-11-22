import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { PasswordValidator } from '../../shared/password.validator';
import {RegistrationService} from "../../service/registration/registration.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService,
              private router: Router) { }

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
      /*console.log(data);*/

      /* Navigate to login page once user is registered */
      if(data) {
        this.router.navigate(['/login']);
      }

    },(error => {
      console.log('Something went wrong!', error);
      })

    );
  }

}
