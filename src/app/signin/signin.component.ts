import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { OauthService} from '../services/oauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  sent = false;

  constructor(private formBuilder: FormBuilder, private oauthService: OauthService, private router: Router) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(4)]],
    },
  );
  }

  get fieldValidation() {
    return this.signinForm.controls;
  }

  isSubmited() {
    this.sent = true;
    if (this.signinForm.invalid) {
      return;
    } else {
      this.oauthService.signIn(this.signinForm.value);
    }
  }

}
