import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EntrepriseServiceService } from 'src/app/services/entrepriseService/entreprise-service.service';

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
  });

  selectFormControl = new FormControl('objetVoyage');

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private entrepriseService: EntrepriseServiceService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      nom: [''],
      matricule: [''],
      domaine: [''],
      objetVoyage: [''],
      tel: [''],
    });
  }

  onSubmit(form: any): void {
    let entrepriseData = {
      nomEntreprise: form.nom,
      matrciule: form.matricule,
      objetVoyage: this.selectFormControl.value,
      tel: form.tel,
      domaineAcitivites: form.domaine,
    };
    this.entrepriseService.signUp(entrepriseData).subscribe((data) => {
      console.log(data);
    });
  }

  getErrorMessage() {}
}
