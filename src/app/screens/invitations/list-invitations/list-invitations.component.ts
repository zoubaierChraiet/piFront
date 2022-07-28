import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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

interface DialogData {
  invitation: any;
  invitationsList: any;
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
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}
  invitation: any;
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
      const entreprise = localStorage.getItem('user');
      const parsedEntreprise: any = JSON.parse(entreprise as string);
      this.invitationsList = res.filter(
        (x: any) =>
          x.entrepriseinvit.idEntreprise === parsedEntreprise?.idEntreprise
      );
    });
  }

  handleDelete(elem: any) {
    this.invitation = elem;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: {
        invitationsList: this.invitationsList,
        invitation: this.invitation,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.deleted) {
        this.invitationsList = this.invitationsList.filter(
          (x: any) => x.idInvitation !== this.invitation.idInvitation
        );
      }
    });
  }

  handleRedirectToEdit(invitation: any) {
    this.router.navigate([`/update-invitation/${invitation.idInvitation}`]);
  }

  addInvitation() {
    this.router.navigate([`/add-invitation`]);
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-confirm.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private invitationsService: InvitationsService
  ) {}

  onNoClick(): void {
    this.dialogRef.close({ deleted: false });
  }

  handleDelete() {
    this.invitationsService
      .delete(this.data.invitation.idInvitation)
      .subscribe((res) => {
        this.data.invitationsList = this.data.invitationsList.filter(
          (x: any) => x.idInvitation !== this.data.invitation.idInvitation
        );
      });
  }

  OnConfirm(): void {
    this.handleDelete();
    this.dialogRef.close({ deleted: true });
  }
}
