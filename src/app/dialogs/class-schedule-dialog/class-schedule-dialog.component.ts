import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StuffService } from 'src/app/services/stuff.service';
import * as moment from 'moment';

const date = moment();

@Component({
  selector: 'app-class-schedule-dialog',
  templateUrl: './class-schedule-dialog.component.html',
  styleUrls: ['./class-schedule-dialog.component.css']
})

export class ClassScheduleDialogComponent implements OnInit {

  classForm!: FormGroup;
  namesTrainer :any;
  coachFromStaffs:any;
  choosenDate:any;

  constructor( 
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _classScheduleService: ClassScheduleService,
    private _snackBar: MatSnackBar,
    private _stuffService: StuffService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.classForm.patchValue(this.data.editStuff);
    this._stuffService.getStuffs().subscribe(res =>{   
    this.namesTrainer = res;
    this.coachFromStaffs =this.namesTrainer.filter((f: { role: any; }) => f.role === "coach" );
    });
  }

  buildForm(){
    this.classForm =  this.formBuilder.group({
      id: new FormControl(''),
      className : new FormControl('',[Validators.required]),
      trainerName : new FormControl('',[Validators.required]),
      startTime : new FormControl('',[ Validators.required]),
      endTime : new FormControl('',[Validators.required]),
      location : new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required])
    });
  }

  addOrEdit(){
    if(this.classForm.valid) {
      if(this.classForm.controls['id'].value) {
        this.choosenDate= moment(this.classForm.controls['date'].value).format("YYYY-MM-DD");
        this.classForm.controls['date'].patchValue(this.choosenDate);
        this._classScheduleService.putClasses(this.classForm.value)
       .subscribe(res=>
         {  },
         (err)=> {});
         this._snackBar.open('Edit is succssesful.', 'OK',
         { duration: 3000});
      }
      else {
        this.choosenDate= moment(this.classForm.controls['date'].value).format("YYYY-MM-DD");     
        this.classForm.controls['date'].patchValue(this.choosenDate);
        this._classScheduleService.postClasses(this.classForm.value)
        .subscribe(res=> 
          {},
          (err)=> {});
          this._snackBar.open('Added is succssesful.', 'OK',
          {
            duration: 3000
          });
      }
      this.closeDialog({data:'network'});
    }
  }

  sendHint(){
    this._dialogRef.close((
      this.data.hint
    ));
  }

  closeDialog(smth: any){
    this._dialogRef.close(smth);
  }
}
