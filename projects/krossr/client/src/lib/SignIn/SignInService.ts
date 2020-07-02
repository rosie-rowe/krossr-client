import { AuthenticationService } from '../Authentication/AuthenticationService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class SignInService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    signIn(username: string, password: string): Promise<void> {
        return this.httpClient.post('auth/signin', {
            username,
            password
        }).toPromise().then((response: UserViewModel) => { // todo User type
            return this.authenticationService.signIn(response);
        });
    }

}
