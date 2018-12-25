import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-punten-item',
    templateUrl: './punten-item.component.html',
    styleUrls: ['./punten-item.component.scss']
})
export class PuntenItemComponent implements OnInit {

    @Input() kandidaat: any;
    @Input() voorspellingsType: 'string';
    @Input() aflevering: number;

    constructor() {
    }

    ngOnInit() {
    }

}
