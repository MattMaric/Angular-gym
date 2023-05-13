import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { MembershipService } from '../services/membership.service';
import Chart from 'chart.js/auto';
import { StuffService } from '../services/stuff.service';
import { ClassScheduleService } from '../services/class-schedule.service';
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataMembers: any = [];
  dataStaff: any = [];
  dataMembership: any = [];
  dataClass: any = [];
  userData: any;

  constructor(
    private membershipService: MembershipService,
    private membersService: MembersService,
    private staffService: StuffService,
    private classService: ClassScheduleService,
    public authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.getChartMembers();
    this.getChartStaff();
    this.getChartMembership();
    this.getChartClasses();
    this.userData = this.authservice.userData;
  }
  
  getChartMembers() {
    this.membersService.getMembers().subscribe(res => {
      this.dataMembers = res;
      this.chartNumberOfMembers();
      this.chartUsedMemberships();
    });
  }

  getChartStaff() {
    this.staffService.getStuffs().subscribe(res => {
      this.dataStaff = res;
      this.chartNumberOfStaff();
    });
  }

  getChartMembership() {
    this.membershipService.getMembership().subscribe(res => {
      this.dataMembership = res;
      this.chartNumberOfMembership();
    });
  }

  getChartClasses() {
    this.classService.getClasses().subscribe(res => {
      this.dataClass = res;
      this.chartNumberOfClasses();
    })
  }
  
  chartNumberOfMembers() {
    var chart1 = new Chart("myChart1", {
      type: 'pie',
      data: {
        datasets: [{
          data: [this.dataMembers.length],
          backgroundColor: 'rgb(255, 99, 132, 0.5)',
          borderColor: 'rgb(225, 225, 225)',
          borderWidth: 1
        }],
        labels: ['Number of members'],
      }
    });
  }

  chartNumberOfStaff() {
    var chart2 = new Chart("myChart2", {
      type: 'pie',
      data: {
        datasets: [{
          data: [this.dataStaff.length],
          backgroundColor: 'rgb(4, 219, 72, 0.5)',
          borderColor: 'rgb(225, 225, 225)',
          borderWidth: 1
        }],
        labels: ['Number of staff'],
      }
    });
  }  

  chartNumberOfMembership() {
    var chart3 = new Chart("myChart3", {
      type: 'pie',
      data: {
        datasets: [{
          data: [this.dataMembership.length],
          backgroundColor: 'rgb(232, 242, 82, 0.5)',
          borderColor: 'rgb(225, 225, 225)',
          borderWidth: 1
        }],
        labels: ['Number of memberships'],
      }
    });
  }
  
  chartUsedMemberships() {
    let resultGold = this.dataMembers.filter((res: any) => res.type === 'Gold Membership');
    let resultGold2 = resultGold.length;
    
    let resultSilver = this.dataMembers.filter((res: any) => res.type === 'Silver Membership');
    let resultSilver2 = resultSilver.length;

    let resultBronze = this.dataMembers.filter((res: any) => res.type === 'Bronze Membership');
    let resultBronze2 = resultBronze.length;

    let resultStudent = this.dataMembers.filter((res: any) => res.type === 'Student Membership');
    let resultStudent2 = resultStudent.length;

    var chart3 = new Chart("myChart4", {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Used memberships',
          data: [resultGold2, resultSilver2, resultBronze2, resultStudent2],
          backgroundColor: ['rgb(252, 236, 3, 0.5)', 'rgb(199, 194, 193, 0.5)', 'rgb(222, 164, 18, 0.5)', 'rgb(227, 2, 2, 0.5)'],
          borderColor: 'rgb(225, 225, 225)',
          borderWidth: 1,
        }],
        labels: ['Gold Membership', 'Silver Membership', 'Bronze Membership', 'Student Membership'],
      },
    });
  }

  chartNumberOfClasses() {
    var chart5 = new Chart("myChart5", {
      type: 'pie',
      data: {
        datasets: [{
          data: [this.dataClass.length],
          backgroundColor: 'rgb(14, 49, 227, 0.5)',
          borderColor: 'rgb(225, 225, 225)',
          borderWidth: 1
        }],
        labels: ['Number of classes'],
      }
    });
  }
}
