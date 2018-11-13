import { Subject } from 'rxjs'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    isAuth = false;

    constructor(private httpClient: HttpClient) { }
    
    authenticate(){
        this.isAuth = true;
    }
    deauthenticate(){
        this.isAuth = false;
    }

}