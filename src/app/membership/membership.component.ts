import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MembershipService } from '../services/membership.service';
import { MatDialog } from '@angular/material/dialog';
import { MembershipDialogComponent } from '../dialogs/membership-dialog/membership-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {PageEvent} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmDeleteComponent } from '../dialogs/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-membership',
  styleUrls: ['./membership.component.css'],
  templateUrl: './membership.component.html',
})

export class MembershipComponent implements OnInit {
  displayedColumns: string[] =  ['src', 'name', 'period', 'price', 'action'];
  memberships!: any;
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  url = '';

  pageEvent!: PageEvent;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private membershipService : MembershipService,
    public dialog : MatDialog,
    private snackBar: MatSnackBar,
    private liveAnnouncer: LiveAnnouncer,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    ) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

  openDialogEdit(newRow: any) {
    let dialogRef = this.dialog.open(MembershipDialogComponent, 
      {
        data: {newRow, message: "Edit Membership List", hint: "close"},
        disableClose: true,
        width: '400px'
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data != 'close') {
          this.populateData();
        } 
      });
  }

  openDialogAdd() {
    let dialogRef = this.dialog.open(MembershipDialogComponent, 
      {
        data: {message: "Add Membership List", hint: "close"},
        disableClose: true,
        width: '400px'
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data != 'close') {
          this.populateData();
        } 
      });
  }

  ngOnInit() {
    this.populateData();
  }

  populateData() {
    this.membershipService.getMembership().subscribe(res => {
      this.memberships = res;
      this.dataSource.data = this.memberships;
      this.length = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  deleteMembership(id: any) {
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, 
      {
        data: {id,
          message: "Are you sure you want to delete this membership?",
          hint: "membership"},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data === 'deleted') {
          this.populateData();
        }
      });
  }

  openSnackBar() {
    this.snackBar.open('Membership cannot be deleted', 'Close', {
      duration: 3000
    });
    }

  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
     }
   }

  onPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    return event
  }
}
