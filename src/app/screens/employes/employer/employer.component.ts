import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployerService } from 'src/app/services/employerService/employer.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

interface DialogData {
  employe: any;
  employesList: any;
}

interface Employe {
  idEmploye: string;
  nom: any[];
  tel: any;
  login: string;
  profession: string;
}

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css'],
})
export class EmployerComponent implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    searchText: [''],
  });

  constructor(
    private employerService: EmployerService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  employesList: Employe[] = [];
  employe: any;
  displayedColumns: string[] = [
    'idEmploye',
    'nom',
    'profession',
    'tel',
    'login',
    'actions',
  ];

  ngOnInit(): void {
    this.employerService.getAll().subscribe((res: any) => {
      this.employesList = res;
    });
  }

  handleDelete(elem: any) {
    this.employe = elem;
    this.openDialog();
  }

  handleRedirectToEdit(invitation: any) {
    this.router.navigate([`/update-employe/${invitation.idEmploye}`]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: { employesList: this.employesList, employe: this.employe },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.deleted) {
        this.employesList = this.employesList.filter(
          (x: any) => x.idEmploye !== this.employe.idEmploye
        );
      }
    });
  }

  ngOnChanges(text: SimpleChanges) {
    this.employerService.getAll().subscribe((res: any) => {
      if (!text) {
        this.employesList = res;
      } else {
        this.employesList = res.filter((x: any) => {
          return (
            x?.tel?.toLowerCase()?.includes(String(text)?.toLowerCase()) ||
            x?.nom?.toLowerCase()?.includes(String(text)?.toLowerCase()) ||
            x?.login?.toLowerCase()?.includes(String(text)?.toLowerCase()) ||
            x?.idEmploye
              .toString()
              ?.toLowerCase()
              ?.includes(String(text)?.toLowerCase())
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
    private employerService: EmployerService
  ) {}

  onNoClick(): void {
    this.dialogRef.close({ deleted: false });
  }

  handleDelete() {
    this.employerService
      .delete(this.data.employe.idEmploye)
      .subscribe((res) => {
        this.data.employesList = this.data.employesList.filter(
          (x: any) => x.idEmploye !== this.data.employe.idEmploye
        );
      });
  }

  OnConfirm(): void {
    this.handleDelete();
    this.dialogRef.close({ deleted: true });
  }
}
