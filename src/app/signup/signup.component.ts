import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { OauthService} from '../services/oauth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  sent = false;

  constructor(private formBuilder: FormBuilder, private oauthService: OauthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(4)]],
    },
    { validator: this.pwdVerification('password', 'confirmPassword') },
  );
  }

  get fieldValidation() {
    return this.signupForm.controls;
  }

  isSubmited() {
    this.sent = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      this.oauthService.signUp(this.signupForm.value);
    }
  }

  pwdVerification(controlName: string, matchingControlName: string) { //une inscription requiert d'entrer 2 fois le mot de passe, cette méthode vérifie l'exactitude du mot de passe lors des 2 entrées
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }

    };
  } 
  

}
