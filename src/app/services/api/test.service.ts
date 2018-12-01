import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TestService {


    api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    // todo aflevering weer meegeven
    gettest(): Observable<any> {
        return this.httpClient.get(`${this.api}/quizvragen`)
            .pipe(
                map(res => <any[]>res));
    }

    saveAnswer(answer): Observable<any> {
        return this.httpClient.post(`${this.api}/quizresultaten`, answer)
            .pipe(
                map(res => <any>res)
            );
    }

    getanswers(): Observable<any[]> {
        return this.httpClient.get(`${this.api}/quizresultaten`)
            .pipe(
                map(res => <any>res));
    }

    gettestresultaat(): Observable<any[]> {
        return this.httpClient.get(`${this.api}/quizpunten/loggedInDeelnemer`)
            .pipe(
                map(res => <any>res));
    }


}
