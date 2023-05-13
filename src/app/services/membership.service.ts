import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { map } from 'rxjs/operators'

@Injectable()
export class MembershipService {
    constructor(
        private httpClient: HttpClient
    ) {}

    /**POST MEMBERSHIP */
    postMembership(memberships: any){
        return this.httpClient.post('http://localhost:3000/membership', memberships)
    }
    /**PUT MEMBERSHIP */
    putMembership(memberships: any){
        return this.httpClient.put('http://localhost:3000/membership/' + memberships.id, memberships)
    }

    /**GET MEMBERSHIP */
    getMembership(){
        return this.httpClient.get('http://localhost:3000/membership')
    }
    
    /**DELETE MEMBERSHIP */
    deleteMembership(id: any) : Observable<any> {
        return this.httpClient.delete<any>('http://localhost:3000/membership/' + id)
        .pipe(map((res:any) => {
            res = 'deleted';
            return res
        }))
    }
}