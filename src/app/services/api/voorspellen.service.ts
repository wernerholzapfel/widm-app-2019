import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoorspellenService {


    api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    getVoorspellingen(): Observable<any[]> {
        return this.httpClient.get(`${this.api}/deelnemers/voorspellingen`).pipe(
            map(res => <any[]>res));
    }

    saveVoorspelling(value): Observable<any> {
        return this.httpClient.post(`${this.api}/voorspellingen/`, JSON.stringify(value)).pipe(
            map(res => <any>res));
    }
}
