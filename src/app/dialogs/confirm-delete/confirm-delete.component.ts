import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembersComponent } from 'src/app/members/members.component';
import { MembersService } from 'src/app/services/members.service';
import { MembershipComponent } from 'src/app/membership/membership.component';
import { MembershipService } from 'src/app/services/membership.service';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { ClassScheduleComponent } from 'src/app/class-schedule/class-schedule.component';
import { StuffService } from 'src/app/services/stuff.service';
import { StuffComponent } from 'src/app/stuff/stuff.component';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
  deleteData: any;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembersComponent>,
    private membersService: MembersService,
    private membershipService: MembershipService,
    private snackBar: MatSnackBar,
    private classScheduleService: ClassScheduleService,
    public dialogRefClass: MatDialogRef<ClassScheduleComponent>,
    private stuffService: StuffService,
    public dialogRefStuff: MatDialogRef<StuffComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRefClass.close((this.deleteData));
  }
  
  delete() {  
   if (this.data.hint ==='stuff'){
      this.stuffService.deleteStuffs(this.data.id).subscribe(
        (memb: any) => {
          this.deleteData = memb; 
          this.closeDialog(); 
          this.openSnackBarStuff();                  
        });   
    }
    else if (this.data.hint ==='membership'){
      if (this.data.id > 4) {
        this.membershipService.deleteMembership(this.data.id).subscribe(
          (memb: any) => {
            this.deleteData = memb; 
            this.closeDialog(); 
            this.openSnackBarMembership(); 
          }
        )        
      } else {
        this.openSnackBarMembership2();
        this.closeDialog();
      }
    }
    else if (this.data.hint === "member") {
      this.membersService.deleteMembers(this.data.id).subscribe((member: any) => {
        this.deleteData = member;
        this.closeDialog();
        this.openSnackBarMembers();
      });
    } 
    else if(this.data.hint ==='class'){
      this.classScheduleService.deleteClasses(this.data.id).subscribe(
        (memb: any) => {
          this.deleteData = memb; 
          this.closeDialog();
          this.openSnackBarClass();      
        });            
    }
 }
 
 openSnackBarStuff() {
  this.snackBar.open('This stuff is deleted', 'Close', {
    duration: 3000
  });
}

openSnackBarMembership() {
  this.snackBar.open('This membership is deleted', 'Close', {
    duration: 3000
  })
}

openSnackBarMembership2() {
  this.snackBar.open('This membership cannot be deleted', 'Close', {
    duration: 3000
  })
}

openSnackBarMembers() {
  this.snackBar.open('This member is deleted', 'Close', { 
    duration: 3000
  })
}
openSnackBarClass() {
  this.snackBar.open('This class is deleted', 'Close', {
    duration: 3000
  })
}
}

