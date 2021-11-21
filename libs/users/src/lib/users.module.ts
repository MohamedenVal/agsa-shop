import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule
    ],
    declarations: [LoginComponent, ProfileIconComponent, ContactComponent],
    exports: [
      ProfileIconComponent,
      ContactComponent
    ]
})
export class UsersModule {}
