import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IActies} from '../../interface/IActies';

@Injectable()
export class ActiesService {

  api = environment.api;

  constructor(private httpClient: HttpClient) {
  }

  getActies(): Observable<IActies> {
    return this.httpClient.get(`${this.api}/acties`).pipe(
      map(res => <IActies>res));
  }

}
