import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MembersService } from '../services/members.service';
import { Members } from '../models/members';
import { MatDialog } from '@angular/material/dialog';
import { MembersDialogComponent } from '../dialogs/members-dialog/members-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from '../dialogs/confirm-delete/confirm-delete.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'surname', 'number', 'email', 'date', 'type', 'action'];
  members: any;
  dataSource = new MatTableDataSource<Members>();

  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50]

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private membersService: MembersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) { 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    this.membersService.getMembers().subscribe(res => {
      this.members = res;
      this.dataSource.data = this.members;
      this.length = this.dataSource.data.length;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  openDialogAdd() {
    let dialogForm = this.dialog.open(MembersDialogComponent, 
      {data : {message: "Add New Member", hint: "close"}, 
        disableClose: true, width: '400px'});
      dialogForm.afterClosed().subscribe((data) => {
        if (data != 'close') {
          this.populateData();
        } 
      })
  }

  openDialogEdit(newRow: any) {
    let dialogForm = this.dialog.open(MembersDialogComponent,
      {data: {newRow, message: "Edit Member", hint: "close"}, disableClose: true, width: '400px'});
      dialogForm.afterClosed().subscribe((data) => {
        if (data != 'close') {
          this.populateData();
        } 
      })
  }

  deleteMember(id: any) {
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, 
      {
        data: {id, message: "Are you sure you want to delete this member?", hint: "member"},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data === 'deleted') {
          this.populateData();
        }
      });
    }

  openSnackBar() {
    this.snackBar.open('This member cannot be deleted', 'Close', {
      duration: 3000
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
