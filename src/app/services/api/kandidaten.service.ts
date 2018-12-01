import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IActies} from '../../interface/IActies';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KandidatenService {

    api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    getKandidaten(): Observable<any[]> {
        return this.httpClient.get(`${this.api}/kandidaten`).pipe(
            map(res => <any[]>res));
    }
}
