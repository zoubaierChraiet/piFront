import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseServiceService } from 'src/app/services/entrepriseService/entreprise-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = this.formBuilder.group({
    nom: '',
    matricule: '',
    domaine: '',
    objetVoyage: '',
    tel: '',
    mdp: ''
  });

  selectFormControl = new FormControl('objetVoyage');

  loading = false;
  submitted = false;
  hide = true;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000, verticalPosition: 'top'});
  }

  constructor(
    private formBuilder: FormBuilder,
    private entrepriseService: EntrepriseServiceService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      matricule: ['', [Validators.required]],
      domaine: [''],
      objetVoyage: ['', [Validators.required]],
      tel: [''],
      mdp: ['']
    });
  }

  onSubmit(form: any): void {
    let entrepriseData = {
      nomEntreprise: form.nom,
      matrciule: form.matricule,
      objetVoyage: this.selectFormControl.value,
      tel: form.tel,
      domaineAcitivites: form.domaine,
      mdp: form.mdp
    };
    console.log(entrepriseData)
    this.entrepriseService.signUp(entrepriseData).subscribe((data) => {
      this.openSnackBar("Inscription effectuer avec succée", 'fermer');
      this.router.navigate(['/log-in']);
    });
  }

  redirectToLogin() {
    this.router.navigate(['/log-in'])
  }

  getErrorMessage() {}
}
