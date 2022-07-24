import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { InvitationsService } from 'src/app/services/invitationsService/invitations.service';

interface Invitation {
  dateInvit: string;
  employes: any[];
  entrepriseinvit: any;
  idInvitation: string;
  mail: string;
  titre: string;
}

@Component({
  selector: 'app-list-invitations',
  templateUrl: './list-invitations.component.html',
  styleUrls: ['./list-invitations.component.css'],
})
export class ListInvitationsComponent implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    searchText: [''],
  });

  constructor(
    private invitationsService: InvitationsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  invitationsList: Invitation[] = [];
  displayedColumns: string[] = [
    'idInvitation',
    'titre',
    'mail',
    'dateInvit',
    'actions',
  ];

  ngOnInit(): void {
    this.invitationsService.getAll().subscribe((res: any) => {
      this.invitationsList = res;
    });
  }

  handleDelete(invitation: any) {
    this.invitationsService
      .delete(invitation.idInvitation)
      .subscribe((data) => {
        this.invitationsList = this.invitationsList.filter(
          (x) => x.idInvitation !== invitation.idInvitation
        );
      });
  }

  handleRedirectToEdit(invitation: any) {
    this.router.navigate([`/update-invitation/${invitation.idInvitation}`]);
  }

  ngOnChanges(text: SimpleChanges) {
    this.invitationsService.getAll().subscribe((res: any) => {
      if (!text) {
        this.invitationsList = res;
      } else {
        this.invitationsList = res.filter((x: any) => {
          return (
            x?.titre?.includes(text) ||
            x?.mail?.includes(text) ||
            x?.idInvitation.toString()?.includes(text)
          );
        });
      }
    });
    return;
  }
}
