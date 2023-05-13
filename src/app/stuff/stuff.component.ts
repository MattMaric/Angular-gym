import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StuffModel } from '../models/stuffModel';
import { StuffService } from '../services/stuff.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { StuffDialogComponent } from '../dialogs/stuff-dialog/stuff-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from '../dialogs/confirm-delete/confirm-delete.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})

export class StuffComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'name', 'surname', 'phone', 'role', 'email', 'action'];
  stuff:any;
  empty = true;
  stuffCollection: StuffModel [] = [];
  dataSource= new MatTableDataSource<StuffModel>();
  length = 0;
  pageSize = 5;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor
  (
    private _stuffService: StuffService,
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public _matDialog: MatDialog,
    public _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
      this.getAllStuffs();
  }

  getAllStuffs(){
      this._stuffService.getStuffs().subscribe(
    (response)=>
    {
      this.dataSource.data = response;
      this.length = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.sort;      
    },
    (error)=>{ return error }
    )  
  }

  getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  deleteStuff(id: any) {
    let dialogRef = this._matDialog.open(ConfirmDeleteComponent, 
      {
        data: {id,
        message: "Are you sure you want to delete this stuff?",
        hint: "stuff"},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data === 'deleted') {
          this.getAllStuffs();
        }
      });
  }

  applyFilter(event:Event){
    this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
  }   

  openDialogAddForm(){
    const dialogRef = this._matDialog.open(StuffDialogComponent, {
      data: {
         message:"ADD STAFF",
         hint: "close"
      },
      width: '400px',
      autoFocus: false,
      disableClose: true,
      panelClass: 'size_modal',
    });
    dialogRef.afterClosed().subscribe((data)=>{
      if (data === 'close') {
        false
      } else {
        this.getAllStuffs();
      }
    });
  }
  
  openDialogEditForm(editStuff: any) {
    const dialogRef = this._matDialog.open(StuffDialogComponent, {
      data: {
      editStuff: editStuff, 
      message:"EDIT STAFF",
      hint: "close"
      },
      width: '400px',
      autoFocus: false,
      disableClose: true,
      panelClass: 'size_modal',
    });
    dialogRef.afterClosed().subscribe((data)=>{
      if (data === 'close') {
        false
      } else {
        this.getAllStuffs();
      }
    });
  }
}



