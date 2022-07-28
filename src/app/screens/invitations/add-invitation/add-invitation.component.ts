import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InvitationsService } from 'src/app/services/invitationsService/invitations.service';
import { EmployerService } from 'src/app/services/employerService/employer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-invitation',
  templateUrl: './add-invitation.component.html',
  styleUrls: ['./add-invitation.component.css'],
})
export class AddInvitationComponent implements OnInit {
  addInvitationForm: FormGroup = this.formBuilder.group({
    mail: [''],
    titre: [''],
  });
  entrepriseinvit: string = '';
  mail: string = '';
  titre: string = '';

  idInvitation: string = '';

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private invitationsService: InvitationsService,
    private employerService: EmployerService,
    private _snackBar: MatSnackBar,
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000, verticalPosition: 'top'});
  }

  ngOnInit(): void {
    this.addInvitationForm = this.formBuilder.group({
      mail: [''],
      titre: [''],
    });
  }

  onSubmit(invitation: any): void {
    const entreprise = localStorage.getItem("user");
    const parsedEntreprise = JSON.parse(entreprise as string);
    let invitationData = {
      entrepriseinvit: {
        idEntreprise: parsedEntreprise.idEntreprise
      },
      mail: invitation.mail,
      titre: invitation.titre,
      dateInvit: new Date().toLocaleDateString()
    };
    this.invitationsService.add(invitationData).subscribe();
    this.employerService.add({
      login: invitation.mail
    }).subscribe((data: any) => {
      this.invitationsService.invite(invitation.mail, data.idEmploye).subscribe();
    })
    this.openSnackBar("Invitation envoyée avec succée", 'fermer')
    window.location.href = '/liste-invitations';
  }
}
