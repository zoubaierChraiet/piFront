import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployerService } from 'src/app/services/employerService/employer.service';

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
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    searchText: [''],
  });

  constructor(
    private employerService: EmployerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  employesList: Employe[] = [];
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

  handleDelete(invitation: any) {
    this.employerService
      .delete(invitation.idEmploye)
      .subscribe((data) => {
        this.employesList = this.employesList.filter(
          (x) => x.idEmploye !== invitation.idEmploye
        );
      });
  }

  handleRedirectToEdit(invitation: any) {
    this.router.navigate([`/update-employe/${invitation.idEmploye}`]);
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
            x?.idEmploye.toString()?.toLowerCase()?.includes(String(text)?.toLowerCase())
          );
        });
      }
    });
    return;
  }

}
