import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from 'src/app/services/employerService/employer.service';

@Component({
  selector: 'app-modifier-employe',
  templateUrl: './modifier-employe.component.html',
  styleUrls: ['./modifier-employe.component.css']
})
export class ModifierEmployeComponent implements OnInit {
  updateEmployerForm: FormGroup = this.formBuilder.group({
    nom: [''],
    tel: [''],
    login: [''],
    profession: [''],
    mdp: [''],
  });
  nom: string = '';
  tel: string = '';
  login: string = '';
  profession: string = '';
  mdp: string = '';

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000, verticalPosition: 'top'});
  }

  selectFormControl = new FormControl('');

  idEmploye: string = "" ;

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeService: EmployerService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.idEmploye = data.idEmploye;
      this.employeService.getById(data.idEmploye).subscribe((res: any) => {
        this.selectFormControl.setValue(res.profession);
        this.updateEmployerForm = this.formBuilder.group({
          nom: res.nom,
          tel: res.tel,
          login: res.login,
          mdp: res.mdp,
          profession: res.profession,
        })
      })
    })
  }

  onSubmit(employe: any): void {
    let employeData = {
      nom: employe.nom,
      tel: employe.tel,
      login: employe.login,
      mdp: employe.mdp,
      idEmploye: this.idEmploye,
      profession: this.selectFormControl.value,
    }
    this.employeService.update(employeData).subscribe(() => {
      this.router.navigate(['/liste-employes'])
      this.openSnackBar("Employé modifier avec succée", 'fermer')
    });
  }
}
