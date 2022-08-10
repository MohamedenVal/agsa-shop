/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { AuthService } from '@agsa-shop/users';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { LocalstorageService } from 'libs/users/src/lib/services/localstorage.service';

@Component({
  selector: 'agsa-shop-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss']
})
export class SiginComponent implements OnInit {
  logInFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = "Email or password is wrong!"

  constructor(
    private formBuilder: FormBuilder,
    private authSevice: AuthService,
    private storageService: LocalstorageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.initSignInForm();
  }

  onSubmit() {
    this.isSubmitted = true;

    if(this.logInFormGroup.invalid) return;

    this.authSevice.login(this.loginForm.email.value, this.loginForm.password.value).subscribe((user) => {
      this.authError = false;
      this.storageService.setToken(user.token);
      this.location.back();
    })
  }

  private initSignInForm() {
    this.logInFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get loginForm() {
    return this.logInFormGroup.controls;
  }

}
