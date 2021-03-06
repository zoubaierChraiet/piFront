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
import { LoginComponent } from './screens/entreprise/login/login.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpComponent } from './screens/entreprise/sign-up/sign-up.component';
import { ListInvitationsComponent } from './screens/invitations/list-invitations/list-invitations.component';
import { UpdateInvitationComponent } from './screens/invitations/update-invitation/update-invitation.component';
import { EmployerComponent } from './screens/employes/employer/employer.component';
import { ModifierEmployeComponent } from './screens/employes/modifier-employe/modifier-employe.component';
import { AddInvitationComponent } from './screens/invitations/add-invitation/add-invitation.component';
import { UpdateEntrepriseComponent } from './screens/entreprise/update-entreprise/update-entreprise.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './screens/dashboard/dashboard.component';

const user = window.localStorage.getItem('user');

const isLoggedInRoutes = [
  { path: 'add-invitation', component: AddInvitationComponent },
  { path: 'liste-invitations', component: ListInvitationsComponent },
  { path: 'update-invitation/:idInvitation', component: UpdateInvitationComponent },
  { path: 'update-entreprise/:idEntreprise', component: UpdateEntrepriseComponent },
  { path: 'update-employe/:idEmploye', component: ModifierEmployeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'liste-employes', component: EmployerComponent },
] 
const notLoggedInRoutes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LoginComponent },
  { path: 'update-employe/:idEmploye', component: ModifierEmployeComponent },
  { path: '**', component: LoginComponent },
]

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, ListInvitationsComponent, UpdateInvitationComponent, EmployerComponent, ModifierEmployeComponent, AddInvitationComponent, UpdateEntrepriseComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule.forRoot(user ? isLoggedInRoutes : notLoggedInRoutes),
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    NgChartsModule,
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
