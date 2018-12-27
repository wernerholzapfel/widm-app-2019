import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../services/app/ui.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-statistieken',
    templateUrl: './statistieken.component.html',
    styleUrls: ['./statistieken.component.scss']
})
export class StatistiekenComponent implements OnInit, OnDestroy {
    unsubscribe: Subject<any> = new Subject();
    statistieken: any[];

    constructor(private uiService: UiService) {
    }

    ngOnInit() {
        this.uiService.statistieken$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response && response.data) {
                this.statistieken = response.data;
            }
        });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
    }

}
