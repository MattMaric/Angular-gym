import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClassSchedule} from '../models/class-schedule.model';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ClassScheduleDialogComponent } from '../dialogs/class-schedule-dialog/class-schedule-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from '../dialogs/confirm-delete/confirm-delete.component';
import { ClassScheduleService } from '../services/class-schedule.service';

declare var $ :any;

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.css']
})
export class ClassScheduleComponent implements OnInit {
  displayedColumns: string[] = ['className', 'trainerName', 'startTime', 'endTime', 'location','date', 'action'];
  dataSource= new MatTableDataSource<ClassSchedule>();
  length = 0;
  pageSize = 5;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private _classScheduleService: ClassScheduleService,
    public _matDialog: MatDialog,
    public _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllClasses();
  }

  getAllClasses(){
      this._classScheduleService.getClasses().subscribe(
    (response: any) =>
    {
      this.dataSource.data = response;
      this.length = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.sort;  
    },
    (error)=>{ return error }
  )
  }
  
  deleteClassRow(id: any) {
    let dialogRef = this._matDialog.open(ConfirmDeleteComponent, 
      {
        data: {id,
        message: "Are you sure you want to delete this class?",
        hint: "class"},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data === 'deleted') {
          this.getAllClasses();
        }
      });
  }
    
  applyFilter(event:Event){
      this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
  }

  openDialogAddNewClassForm(){
    const dialogRef = this._matDialog.open(ClassScheduleDialogComponent, {
      data: {
        message:"ADD NEW CLASS",
        hint: "network"
      },
      width: '400px',
      autoFocus: false,
      disableClose: true,
      panelClass: 'size_modal',
  
      });
      dialogRef.afterClosed().subscribe((data)=>{
        if(data != "network"){
          this.getAllClasses();
        }
      }); 
  }

  openDialogEditClassForm(editStuff: any) {
      const dialogRef = this._matDialog.open(ClassScheduleDialogComponent, {
      data: {
      editStuff: editStuff, 
      message:"EDIT STAFF",
      hint: "network"
      },
      width: '400px',
      autoFocus: false,
      disableClose: true,
      panelClass: 'size_modal', 
      });
      dialogRef.afterClosed().subscribe((data)=>{
        if(data !== "network"){
          this.getAllClasses();
        }
      });
  } 
}


