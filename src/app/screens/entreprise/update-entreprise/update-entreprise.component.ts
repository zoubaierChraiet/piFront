import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntrepriseServiceService } from 'src/app/services/entrepriseService/entreprise-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-entreprise',
  templateUrl: './update-entreprise.component.html',
  styleUrls: ['./update-entreprise.component.css']
})
export class UpdateEntrepriseComponent implements OnInit {
  updateForm: FormGroup = this.formBuilder.group({
    nom: '',
    matricule: '',
    domaine: '',
    objetVoyage: '',
    tel: '',
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000, verticalPosition: 'top'});
  }

  selectFormControl = new FormControl('objetVoyage');

  idEntreprise: string = "" ;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private entrepriseService: EntrepriseServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.idEntreprise = data.idEntreprise;
      this.entrepriseService.getById(data.idEntreprise).subscribe((res: any) => {
        console.log(res)
        this.selectFormControl.setValue(res.objetVoyage);
        this.updateForm = this.formBuilder.group({
          nom: res.nomEntreprise,
          matricule: res.matrciule,
          domaine: res.domaineAcitivites,
          tel: res.tel,
          objetVoyage: res.objetVoyage,
        });
        
      })
    })
  }

  onSubmit(form: any): void {
    let entrepriseData = {
      nomEntreprise: form.nom,
      matrciule: form.matricule,
      objetVoyage: this.selectFormControl.value,
      tel: form.tel,
      domaineAcitivites: form.domaine,
      idEntreprise: this.idEntreprise
    };
    this.entrepriseService.update(entrepriseData).subscribe(() => {
      // window.location.href = '/update-entreprise/' + this.idEntreprise
      this.openSnackBar("Profile modifier avec succée", 'fermer')
    });
  }

}
