import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class SettingsService {
    constructor(
        private httpClient: HttpClient
    ) {}

    gymName: Subject<string> = new Subject<string>();
    footerName: Subject<string> = new Subject<string>();


    changeGymName(name: string) {
        this.gymName.next(name);
    }
    
    getGymName() {
        return this.gymName.asObservable();
    }

    changeFooterName(name: string) {
        this.footerName.next(name);
    }

    getFooterName() {
        return this.footerName.asObservable();
    }

    //Post settings
    postSettings(settings: any){
        return this.httpClient.post('http://localhost:3000/settings', settings)
    }

    //Put settings
    putSettings(settings: any){
        return this.httpClient.put('http://localhost:3000/settings/' + settings.id, settings)
    }

    //Get settings
    getSettings(){
        return this.httpClient.get('http://localhost:3000/settings')
    }
}