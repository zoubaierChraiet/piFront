import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { EmployerService } from 'src/app/services/employerService/employer.service';
import { EntrepriseServiceService } from 'src/app/services/entrepriseService/entreprise-service.service';
import { InvitationsService } from 'src/app/services/invitationsService/invitations.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listeEntreprise :any;
  listeEmploye :any;
  listeInvitation :any;

  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: 'Entreprise invitations'},
  ];
  public radarChartType: ChartType = 'radar';
  constructor(
    private entrepriseService: EntrepriseServiceService,
    private employeService: EmployerService,
    private invitationService: InvitationsService,
  ) { }

  ngOnInit() {
    this.entrepriseService.getAll().subscribe((data:any) => {
      this.listeEntreprise = data
      this.radarChartLabels = this.listeEntreprise.map((x: any) => x.nomEntreprise)
      const intrepriseIds = this.listeEntreprise.map((x: any) => x.idEntreprise)
      this.invitationService.getAll().subscribe((data:any) => {
        this.listeInvitation = data
        const radarData = intrepriseIds.map((idEnt: any) => this.listeInvitation.filter(
          (x: any) =>
            x.entrepriseinvit.idEntreprise === idEnt
        )?.length || 0)
        console.log(radarData)
        this.radarChartData = [
          {data: radarData, label: 'Entreprise invitations'},
        ];
      })
    })
  }

}
