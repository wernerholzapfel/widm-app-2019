import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable()
export class UiService {

    activePoule$: Subject<any> = new Subject();
    deelnemerId$: Subject<any> = new Subject();

}
