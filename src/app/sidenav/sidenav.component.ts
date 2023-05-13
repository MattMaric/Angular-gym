import { animate, style, transition, trigger , keyframes} from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter',[
        style({opacity:0}),
        animate('650ms',
        style({opacity:1})
        )
      ]),
      transition(':leave',[
        style({opacity:1}),
        animate('50ms',
        style({opacity:0})
        )
      ])
    ]),
    /*only for button of navside*/
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
        keyframes([
          style({transform: 'rotate(0deg)', offset: '0'}),
          style({transform: 'rotate(2turn)', offset: '1'})
        ]))
      ])
    ])
  ]
})

export class SidenavComponent implements OnInit {
  /*It will emit data to app component*/ 
  @Output() onToggleSideNav: EventEmitter<any>= new EventEmitter();
  screenWidth: number=0;
  collapsed = false;
  list=false;

  /* When change size window, size added to property  and emitter  emit value, if  <= 768, navside is shrink  */
  @HostListener('window:resize', ['$event'])
  onResize(_event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768)
    this.collapsed =false;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth: this.screenWidth});
    this.list=false;
  }

  gymNameSubscription!: Subscription;
  gymName!: any;
  firstGymName!: any;
   
  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.settingsService.getSettings().subscribe((data: any) =>
    this.firstGymName = data[0].name
      )
    
    this.gymNameSubscription = this.settingsService.getGymName().subscribe((gymName) =>
      this.gymName = gymName
    );
  }

  /*Function of button. When click navside is shrink or expand*/
  toggleCollapse(){
    this.collapsed =!this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth: this.screenWidth})
    this.list=true;
    if(this.collapsed == false){
      this.list=false;
    }
  }

  /*close*/ 
  closeSidenav(){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth: this.screenWidth})
    this.list = false;
  }

  /*Open list links Membership management */ 
 
  openList() {
    this.collapsed =!this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth: this.screenWidth})
    this.list = true; 
    if (!this.collapsed) {
      this.list = false;
    }
  }
}


