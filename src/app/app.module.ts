import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'  
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './screens/login/login.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { ListInvitationsComponent } from './screens/invitations/list-invitations/list-invitations.component';
import { UpdateInvitationComponent } from './screens/invitations/update-invitation/update-invitation.component';
import { EmployerComponent } from './screens/employes/employer/employer.component';
import { ModifierEmployeComponent } from './screens/employes/modifier-employe/modifier-employe.component';
import { AddInvitationComponent } from './screens/invitations/add-invitation/add-invitation.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, ListInvitationsComponent, UpdateInvitationComponent, EmployerComponent, ModifierEmployeComponent, AddInvitationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule.forRoot([
      { path: 'sign-up', component: SignUpComponent },
      { path: 'add-invitation', component: AddInvitationComponent },
      { path: 'liste-invitations', component: ListInvitationsComponent },
      { path: 'update-invitation/:idInvitation', component: UpdateInvitationComponent },
      { path: 'update-employe/:idEmploye', component: ModifierEmployeComponent },
      { path: 'liste-employes', component: EmployerComponent },
      { path: '**', component: LoginComponent },
    ]),
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
