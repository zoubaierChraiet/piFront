import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InvitationsService } from 'src/app/services/invitationsService/invitations.service';

@Component({
  selector: 'app-update-invitation',
  templateUrl: './update-invitation.component.html',
  styleUrls: ['./update-invitation.component.css']
})
export class UpdateInvitationComponent implements OnInit {
  updateInvitationForm: FormGroup = this.formBuilder.group({
    nom: [''],
    matricule: [''],
    domaine: [''],
    objetVoyage: [''],
    tel: [''],
  });
  nom: string = '';
  matricule: string = '';
  domaine: string = '';
  objetVoyage: string = '';
  tel: string = '';

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private invitationsService: InvitationsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.invitationsService.getById(data.idInvitation).subscribe(res => {
        console.log(res);
      })
    })
  }

  onSubmit(form: any): void {
    let entrepriseData = {
      nomEntreprise : form.nom,
      matrciule : form.matricule,
      objetVoyage : 'semianire',
      tel : form.tel,
      domaineAcitivites : form.domaine,
    }
    // this.entrepriseService.signUp(entrepriseData).subscribe(data => {
    //   console.log(data)
    // })
  }

}
