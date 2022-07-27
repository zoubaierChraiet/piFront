import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InvitationsService } from 'src/app/services/invitationsService/invitations.service';

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
  ) {}

  ngOnInit(): void {
    this.addInvitationForm = this.formBuilder.group({
      mail: [''],
      titre: [''],
    });
  }

  onSubmit(invitation: any): void {
    let invitationData = {
      entrepriseinvit: {
        idEntreprise: 2
      },
      mail: invitation.mail,
      titre: invitation.titre,
      dateInvit: new Date().toLocaleDateString()
    };
    this.invitationsService.add(invitationData).subscribe();
    window.location.href = '/liste-invitations';
  }
}
