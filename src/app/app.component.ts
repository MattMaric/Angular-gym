import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularGym';

  isSideNavCollapsed = false;
  screenWidth = 0;
/*Emitter from sidenav component is emiting values of properties and that values adding isSideNavCollapsed 
  and screenWidth which values use in body component */
  onToggleSideNav(data:any){
    this.screenWidth= data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }
}
