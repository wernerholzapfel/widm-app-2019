import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IPoules} from '../../interface/IPoules';

@Injectable()
export class PoulesService {

    api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    getPoules(): Observable<IPoules> {
        return this.httpClient.get(`${this.api}/deelnemers/bc085a11-278f-4429-9c9e-560364dac25c/voorspellingen`).pipe(
            map(res => <IPoules>res));
    }
}
