import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '../services/settings.service'; 

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsData: any;
  settingsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.settingsService.getSettings().subscribe((res: any) => {
      this.settingsForm.patchValue(res[0]);
    })
  }

  buildForm() {
    this.settingsForm = this.formBuilder.group({
      id : new FormControl(''),
      name : new FormControl('', Validators.required),
      date : new FormControl('', Validators.required),
      address : new FormControl('', Validators.required),
      phoneNumber : new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      country : new FormControl('', Validators.required),
      email : new FormControl('',[Validators.required, Validators.email]),
      copyright : new FormControl('', Validators.required)
    });
  }

  saveSettings(gymName: string, copyrightName: string) {
    this.settingsService.putSettings(this.settingsForm.value).subscribe(sett => {});
    this.snackBar.open("Settings are edited.", "Close", {
      duration: 3000
    })
    this.settingsService.changeGymName(gymName);
    this.settingsService.changeFooterName(copyrightName);
  }
}
