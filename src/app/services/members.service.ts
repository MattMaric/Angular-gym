import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable()
export class MembersService {
    constructor(
        private httpClient: HttpClient
    ){}

    // Get Members
    getMembers() {
        return this.httpClient.get('http://localhost:3000/members')
    }

    // Post Members
    postMembers(members: any) {
        return this.httpClient.post('http://localhost:3000/members', members)
    }

    // Put Members
    putMembers(members: any) {
        return this.httpClient.put('http://localhost:3000/members/' + members.id, members)
    }

    // Delete Members
    deleteMembers(id: any) : Observable<any> {
        return this.httpClient.delete('http://localhost:3000/members/' + id)
        .pipe(map((res:any) => {
            res = 'deleted';
            return res
        }))
    } 
}