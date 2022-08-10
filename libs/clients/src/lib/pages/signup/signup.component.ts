import { User, UsersService } from '@agsa-shop/users';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'agsa-shop-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  userPramId = '';

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      street: this.userForm.street.value,
      apartement: this.userForm.apartement.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value
    };
    if (this.editMode) {
      user.id = this.userPramId;
      this._updateUser(user);
    } else {
      console.log('hey there step before creating!');
      this._createUser(user);
    }
  }

  // enttializing the form
  private _initForm() {
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        street: [''],
        apartement: [''],
        zip: [''],
        city: [''],
        country: ['']
    });
}

  // method for creating a ctegory
  private _createUser(user: User) {
    // creating ...
    this.usersService.createUser(user).subscribe(
        (user: User) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `User ${user.name} was greated!`
            });
            timer(2000)
                .toPromise()
                .then(() => {
                    this.location.back();
                });
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        () => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Sorry, user not created!'
            });
        }
    );
}

// method for updating a specific user
private _updateUser(user: User) {
    // Updating ...
    this.usersService.updateUser(user, this.userPramId).subscribe(
        (user: User) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `User ${user.name} was updated!`
            });
            timer(2000)
                .toPromise()
                .then(() => {
                    this.location.back();
                });
        },
        () => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Sorry, user was not updated!'
            });
        }
    );
}

  private _checkEditMode() {
    // some code
    this.route.params.subscribe((pararms) => {
      if (pararms.id) {
        this.userPramId = pararms.id;
        this.editMode = true;
        this.usersService.getSingleUser(pararms.id).subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.street.setValue(user.street);
          this.userForm.apartement.setValue(user.apartement);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  // refactoring for getting the form controls
  get userForm() {
    return this.form.controls;
  }
}
