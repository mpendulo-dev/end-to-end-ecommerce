import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {LoginService} from "../../service/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }
  /* Getter for form controls */
  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }
  login() {
    /*console.log(this.loginForm.value);*/
    this.loginService.userLogin(this.loginForm.value).subscribe(user => {
    /*  console.log(user);*/

      if(user) {
        this.router.navigate(['/home']);
      }
    },(error) =>{
        console.log('Something went wrong', error);
    })
  }
}
