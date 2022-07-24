import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationsService } from 'src/app/services/invitationsService/invitations.service';

@Component({
  selector: 'app-update-invitation',
  templateUrl: './update-invitation.component.html',
  styleUrls: ['./update-invitation.component.css']
})
export class UpdateInvitationComponent implements OnInit {
  updateInvitationForm: FormGroup = this.formBuilder.group({
    dateInvit: [''],
    entrepriseinvit: [''],
    mail: [''],
    titre: [''],
  });
  dateInvit: string = '';
  entrepriseinvit: string = '';
  mail: string = '';
  titre: string = '';

  idInvitation: string = "" ;

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private invitationsService: InvitationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.idInvitation = data.idInvitation;
      this.invitationsService.getById(data.idInvitation).subscribe((res: any) => {
        this.updateInvitationForm = this.formBuilder.group({
          dateInvit: res.dateInvit,
          entrepriseinvit: res.entrepriseinvit,
          mail: res.mail,
          titre: res.titre,
        })
        console.log(res);
      })
    })
  }

  onSubmit(invitation: any): void {
    let invitationData = {
      dateInvit: invitation.dateInvit,
      entrepriseinvit: null,
      mail: invitation.mail,
      titre: invitation.titre,
      idInvitation: this.idInvitation
    }
    this.invitationsService.update(invitationData).subscribe();
    window.location.href = '/liste-invitations'
  }

}
