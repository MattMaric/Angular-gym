import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerNameSubscription!: Subscription;
  footerName: any;
  firstFooterName: any; 

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((data: any) =>
    this.firstFooterName = data[0].copyright
    )
    this.footerNameSubscription = this.settingsService.getFooterName().subscribe((footerName) =>
      this.footerName = footerName
    );
  }

}
