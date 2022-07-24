import { Component, OnInit } from '@angular/core';

import { InvitationsService } from 'src/app/services/invitationsService/invitations.service';

interface Invitation {
  dateInvit: string
  employes: any[]
  entrepriseinvit: any
  idInvitation: string
  mail: string
  titre: string
}

@Component({
  selector: 'app-list-invitations',
  templateUrl: './list-invitations.component.html',
  styleUrls: ['./list-invitations.component.css']
})
export class ListInvitationsComponent implements OnInit {

  constructor(private invitationsService: InvitationsService) { }

  invitationsList: Invitation[] = [];
  displayedColumns: string[] = ['idInvitation', 'titre', 'mail', 'dateInvit'];

  ngOnInit(): void {
    this.invitationsService.getAll().subscribe((res : any) => {
      this.invitationsList = res;
    })
  }

}
