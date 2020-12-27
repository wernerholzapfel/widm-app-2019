import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {IPoules} from './interface/IPoules';


export interface IParticipant {
    id?: string;
    display_name?: string;
    email?: string;
}

@Injectable({
    providedIn: 'root'
})
export class DeelnemerService {
    api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    postDeelnemer(body: IParticipant): Observable<IParticipant> {
        return this.httpClient.post<IParticipant>(`${this.api}/deelnemers`, body)
            .pipe(map(res => <IParticipant>res));
    }

    getDeelnemer(): Observable<IParticipant> {
        return this.httpClient.get(`${this.api}/deelnemers`);
    }
}
