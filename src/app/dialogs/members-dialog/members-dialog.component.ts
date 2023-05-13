import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembersService } from 'src/app/services/members.service';
import { Members } from 'src/app/models/members';
import { MembersComponent } from 'src/app/members/members.component';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembershipService } from 'src/app/services/membership.service';

@Component({
  selector: 'app-members-dialog',
  templateUrl: './members-dialog.component.html',
  styleUrls: ['./members-dialog.component.css']
})
export class MembersDialogComponent implements OnInit {

  members: Members[] = [];
  membersForm!: FormGroup;
  names: any;
  url = '';

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }
    return '';
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membersService: MembersService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MembersComponent>,
    private snackBar: MatSnackBar,
    private membershipService: MembershipService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.data.newRow) {
      this.url = this.data.newRow.image
    } else {
      this.url = "../../../assets/imgs/avatar-membership.png"
    }
    this.membersForm.patchValue(this.data.newRow);
    this.membershipService.getMembership().subscribe(res => {
      this.names = res;
    });
  } 

  buildForm() {
    this.membersForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      image : new FormControl('')
    })
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

  closeDialogHint(data: any) {
    this.dialogRef.close(data);
  }

  addMembers() {
    if(this.membersForm.controls['id'].value) {
      this.membersService.putMembers(this.membersForm.value).subscribe( member => {});
      this.snackBar.open('This member is edited', 'Close', {
        duration: 3000
      })
    } else {
      this.membersService.postMembers(this.membersForm.value).subscribe( member => {});
      this.snackBar.open('This member is added', 'Close', {
        duration: 3000
      })
    }
    this.closeDialogHint({data: "close"});
  }

  selectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.membersForm.controls['image'].setValue(this.url);
      } 
    }
  }
}
