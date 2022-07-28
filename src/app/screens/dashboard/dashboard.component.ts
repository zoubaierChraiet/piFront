import { Component, OnInit } from '@angular/core';
import { EntrepriseServiceService } from 'src/app/services/entrepriseService/entreprise-service.service';
import { InvitationsService } from 'src/app/services/invitationsService/invitations.service';
import { EmployerService } from 'src/app/services/employerService/employer.service'
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listeEntreprise :any;
  listeEmploye :any;
  listeInvitation :any;

  // Donats
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
      { data: [ 50, 150, 120 ] },
      { data: [ 250, 130, 70 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // Radar
  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: 'Entreprise invitations'},
  ];
  public radarChartType: ChartType = 'radar';
  constructor(
    private entrepriseService: EntrepriseServiceService,
    private invitationService: InvitationsService,
    private employerService: EmployerService,
  ) { }

  ngOnInit() {
    this.entrepriseService.getAll().subscribe((entData:any) => {
      this.listeEntreprise = entData
      this.radarChartLabels = this.listeEntreprise.map((x: any) => x.nomEntreprise)
      const intrepriseIds = this.listeEntreprise.map((x: any) => x.idEntreprise)
      this.invitationService.getAll().subscribe((invData:any) => {
        this.employerService.getAll().subscribe((empData: any) => {
          this.listeEmploye = empData;
          this.listeInvitation = invData
          const radarData = intrepriseIds.map((idEnt: any) => this.listeInvitation.filter(
            (x: any) =>
              x.entrepriseinvit.idEntreprise === idEnt
          )?.length || 0)
          this.doughnutChartData = {
            labels: ['Nombres entreprise', 'Nombre invitations', 'Nombre employes' ],
            datasets: [
              { data: [ this.listeEntreprise.length, this.listeInvitation.length, this.listeEmploye.length ] },
            ]
          }
          this.radarChartData = [
            {data: radarData, label: 'Entreprise invitations'},
          ];
        })
      })
    })
  }
}



