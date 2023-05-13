import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembershipComponent } from 'src/app/membership/membership.component';
import { MembershipService } from 'src/app/services/membership.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Membership } from 'src/app/models/membership.model';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-membership-dialog',
  templateUrl: './membership-dialog.component.html',
  styleUrls: ['./membership-dialog.component.css']
})
export class MembershipDialogComponent implements OnInit {

  memberships: Membership[] = [];
  selectedName: string = '';
  lengthData :any = [];
  membershipForm!: FormGroup;

  url = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembershipComponent>,
    private membershipService: MembershipService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private imageCompress: NgxImageCompressService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.data.newRow) {
      this.url = this.data.newRow.image
    } else {
      this.url = "../../../assets/imgs/avatar-membership.png"
    }
    this.membershipForm.patchValue(this.data.newRow);
  }

  buildForm() {
    this.membershipForm = this.formBuilder.group({
      id : new FormControl(''),
      name : new FormControl('', Validators.required),
      period : new FormControl('', Validators.required),
      price : new FormControl('', Validators.required),
      image : new FormControl('', Validators.required)
    });
  }

  closeDialogHint(data: any): void {
    this.dialogRef.close(data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addMembership(){
    if(this.membershipForm.controls['id'].value) {
      this.membershipService.putMembership(this.membershipForm.value).subscribe(
        memb => {});
        this.snackBar.open("This membership is edited.", "Close", {
          duration: 3000
        });
    } else {
      this.membershipService.postMembership(this.membershipForm.value).subscribe(
        memb => {});
        this.snackBar.open("This membership is added.", "Close", {
          duration: 3000
        });
    }
    this.closeDialogHint({data: "close"});
  }

  //IMAGE CHECK
  selectFile(event: any) {
      if (event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.membershipForm.controls['image'].setValue(this.url);
      }
    }
  }
}
