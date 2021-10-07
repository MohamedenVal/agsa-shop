import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    logInFormGroup!: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'Email or Password are worng!';

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private localstorageService: LocalstorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initLoginForm();
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.logInFormGroup.invalid) return;

        this.auth
            .login(this.loginForm.email.value, this.loginForm.password.value)
            .subscribe(
                (user) => {
                    this.authError = false;
                    this.localstorageService.setToken(user.token);
                    this.router.navigate(['/']);
                },
                (err) => {
                    if (+err.status > 400) {
                        this.authMessage =
                            'We are sorry, there seems to be something wrong! Try again later.';
                    }
                    this.authError = true;
                }
            );
    }
    private _initLoginForm() {
        // ...
        this.logInFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    get loginForm() {
        return this.logInFormGroup.controls;
    }
}
