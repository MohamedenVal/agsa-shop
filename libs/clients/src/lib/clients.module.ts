import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SiginComponent } from './pages/sigin/sigin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ClientIconComponent } from './components/client-icon/client-icon.component';

const routes: Routes = [
    /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    {
        path: 'client/sign-in',
        component: SiginComponent
    },
    {
        path: 'client/sign-up',
        component: SignupComponent
    },
    {
        path: 'client/profile/:clientusername',
        component: ProfileComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
      ProfileComponent,
      SignupComponent,
      SiginComponent,
      ContactComponent,
      ClientIconComponent
    ],
    exports: [
      ProfileComponent,
      SignupComponent,
      SiginComponent,
      ContactComponent,
      ClientIconComponent
    ]
})
export class ClientsModule {}
