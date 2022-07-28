import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseServiceService } from 'src/app/services/entrepriseService/entreprise-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup = this.formBuilder.group({
    matricule: '',
    password: '',
  });

  hide = true;
  errorMessage = "" ;
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private entrepriseServiceService: EntrepriseServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formBuilder.group({
      matricule: '',
      mdp: '',
    });
  }

  redirectToSignUp() {
    this.router.navigate(['/sign-up'])
  }

  onSubmit(form: any): void {
    this.entrepriseServiceService
      .logIn(form.matricule, form.password)
      .subscribe((res: any) => {
        if (res) {
          window.localStorage.setItem('user', JSON.stringify(res));
          window.location.href = `update-entreprise/${res.idEntreprise}`
        } else {
          this.errorMessage = "Matricule ou mot de passe incorrecte";
          this.isError = true;
        }
      });
  }
}
