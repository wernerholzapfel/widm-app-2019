import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IPoule} from '../../interface/IPoules';


export interface IAddDeelnemer {
    uniqueIdentifier: string;
    poule: { id: string };
}

export interface IAcceptInvite {
    uitnodigingId: string;
    poule: { id: string };
}

export interface IUitnodigingResponse {
    id: string;
    isAccepted: boolean;
    isDeclined: boolean;
    poule: IPoule;
    uniqueIdentifier: string;
}

@Injectable({
    providedIn: 'root'
})
export class UitnodigingenService {

    api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    joinPoule(invitationId): Observable<IPoule> {
        return this.httpClient.post<IPoule>(`${this.api}/poulesinvitation/accept`, {id: invitationId});
    }

    getUitnodigingen(): Observable<any> {
        return this.httpClient.get(`${this.api}/uitnodigingen`).pipe(
            map(res => <any>res)
        );
    }

    getUitnodigingenByPoule(pouleId): Observable<any> {
        return this.httpClient.get(`${this.api}/uitnodigingen/poule/${pouleId}`).pipe(
            map(res => <any>res)
        );
    }

    addDeelnemer(body: IAddDeelnemer): Observable<IAddDeelnemer> {
        return this.httpClient.post(`${this.api}/uitnodigingen/create`, body).pipe(
            map(res => <IAddDeelnemer>res));
    }

    acceptInvite(body: IAcceptInvite): Observable<IAcceptInvite> {
        return this.httpClient.post(`${this.api}/uitnodigingen/accept`, body).pipe(
            map(res => <IAcceptInvite>res));
    }

    declineInvite(body: IAcceptInvite): Observable<IAcceptInvite> {
        return this.httpClient.post(`${this.api}/uitnodigingen/decline`, body).pipe(
            map(res => <IAcceptInvite>res));
    }
}
