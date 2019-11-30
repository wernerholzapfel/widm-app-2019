import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IPoules} from '../../interface/IPoules';
import {HttpClient} from '@angular/common/http';


export interface ICreatePoule {
    id?: string;
    poule_name: string;
    deelnemers: { id: string }[];
    admins: { id: string }[];
}


@Injectable()
export class PoulesService {

    api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    getPoules(): Observable<IPoules> {
        return this.httpClient.get(`${this.api}/deelnemers/loggedIn`).pipe(
            map(res => <IPoules>res));
    }

    getKlassement(): Observable<{ data: any[] }> {
        return this.httpClient.get(`${this.api}/standen`).pipe(
            map(res => <{ data: any[] }>res));
    }


    createPoule(body: ICreatePoule): Observable<ICreatePoule> {
        return this.httpClient.post(`${this.api}/poules/create`, body).pipe(
            map(res => <ICreatePoule>res));
    }


}
