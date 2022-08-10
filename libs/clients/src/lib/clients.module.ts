import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SiginComponent } from './pages/sigin/sigin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ClientIconComponent } from './components/client-icon/client-icon.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ClientsGuard } from './services/clients.guard';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

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
      path: 'contact',
      component: ContactComponent
    },
    {
        path: 'client/profile',
        canActivate: [ClientsGuard],
        children: [
          {
            path: '',
            component: ProfileComponent
          }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        CardModule,
        ToolbarModule,
        InputNumberModule,
        InputTextareaModule,
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
    ],
    providers: [
      MessageService,
    ]
})
export class ClientsModule {}
